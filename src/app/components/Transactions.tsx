'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Table from './Table';
import TransactionFilters from './TransactionFilters';
import ConnectionStatus from './ConnectionStatus';
import { TransactionResponse, Filters } from 'app/lib/types';
import { format } from 'date-fns';

type TransactionProps = {
  accountId: string;
};

type Transaction = {
  date: string;
  source: string;
  destination: string;
  amount: string;
  currency: string;
};

const WEBSOCKET_URL =
  'wss://paloma-financial-auditor-0aff70148dbe.herokuapp.com/accounts/:accountId/transactions';

const columns = [
  { id: 'date', label: 'Date' },
  { id: 'source', label: 'Source' },
  { id: 'destination', label: 'Destination' },
  { id: 'amount', label: 'Amount' },
  { id: 'currency', label: 'Currency' },
];

const transformRowData = (data: TransactionResponse): Transaction => {
  return {
    date: format(data.timestamp, 'dd LLL y p'),
    source: data.sourceName,
    destination: data.destinationName,
    amount: `${
      data.direction === 'inflow' ? '+' : '-'
    }${new Intl.NumberFormat().format(data.amount)}`,
    currency: data.currency,
  };
};

const Transactions = ({ accountId }: TransactionProps) => {
  const [data, setData] = useState<TransactionResponse[]>([]);
  const [filteredData, setFilteredData] = useState<Transaction[]>([]);
  const [connectionActive, setConnectionActive] = useState<boolean>(false);
  const [connectionLoading, setConnectionLoading] = useState<boolean>(false);
  const [availableCurrencies, setAvailableCurrencies] = useState<Set<string>>(
    new Set()
  );
  const [filters, setFilters] = useState<Filters>({
    minAmount: undefined,
    maxAmount: undefined,
    currencies: [],
  });

  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    setData([]);
    setFilteredData([]);
  }, [accountId]);

  const handleNewTransaction = (transaction: TransactionResponse) => {
    setData((prevData) => [transaction, ...prevData]);
    setAvailableCurrencies((currSet) => currSet.add(transaction.currency));
    const filtered = filterData([transaction], filters);
    if (filtered.length > 0) {
      const transformedData = transformRowData(transaction);
      setFilteredData((prevData) => [transformedData, ...prevData]);
    }
  };

  const connectWebSocket = useCallback(() => {
    if (wsRef.current) {
      console.warn('WebSocket is already open.');
      return;
    }

    const activeWebSocketUrl = WEBSOCKET_URL.replace(':accountId', accountId);
    const ws = new WebSocket(`${activeWebSocketUrl}`);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('🚨 WebSocket connection established');
      setConnectionActive(true);
      setConnectionLoading(false);
    };

    ws.onmessage = (event) => {
      try {
        const transaction = JSON.parse(event.data);
        handleNewTransaction(transaction);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    ws.onclose = () => {
      console.log('🚨 WebSocket connection closed');
      setConnectionActive(false);
      setConnectionLoading(false);
      wsRef.current = null;
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      ws.close();
    };
  }, [accountId]);

  const disconnectWebSocket = useCallback(() => {
    if (wsRef.current) {
      setConnectionLoading(true);
      wsRef.current?.close();
      wsRef.current = null;
    }
  }, []);

  const toggleConnection = () => {
    setConnectionLoading(true);
    if (connectionActive && wsRef.current) return disconnectWebSocket();
    connectWebSocket();
  };

  useEffect(() => {
    if (!wsRef.current || wsRef.current?.readyState !== WebSocket.CONNECTING) {
      connectWebSocket();
    }

    // Cleanup WebSocket connection on component unmount
    return () => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        disconnectWebSocket();
      }
    };
  }, [accountId]);

  const filterData = (
    unfilteredData: TransactionResponse[],
    filter: Filters
  ) => {
    return unfilteredData.filter((transaction) => {
      return (
        (filter.minAmount ? transaction.amount >= filter.minAmount : true) &&
        (filter.maxAmount ? transaction.amount <= filter.maxAmount : true) &&
        (filter.currencies?.length
          ? filter.currencies?.includes(transaction.currency)
          : true)
      );
    });
  };

  const handleFilterChange = (updatedFilters: {
    minAmount?: number;
    maxAmount?: number;
    currencies?: string[];
  }) => {
    const updatedData = filterData(data, updatedFilters).map((row) =>
      transformRowData(row)
    );
    filters.minAmount = updatedFilters.minAmount;
    filters.minAmount = updatedFilters.minAmount;
    filters.currencies = updatedFilters.currencies;
    setFilters(filters);
    setFilteredData(updatedData);
  };

  return (
    <>
      <TransactionFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        availableCurrencies={[...availableCurrencies]}
      />
      <ConnectionStatus
        isActive={connectionActive}
        isLoading={connectionLoading}
        onClick={toggleConnection}
      />
      <Table
        rows={filteredData}
        columns={columns}
        height={320}
        rowHeight={45}
        width={'100%'}
      />
    </>
  );
};

export default Transactions;
