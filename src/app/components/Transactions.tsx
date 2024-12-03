'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Table from './Table';
import TransactionFilters from './TransactionFilters';
import ConnectionStatus from './ConnectionStatus';
import { TransactionResponse } from 'app/lib/types';

type TransactionProps = {
  accountId: string;
};

type Transaction = {
  date: string;
  account: string;
  amount: string;
  currency: string;
};

const WEBSOCKET_URL =
  'wss://paloma-financial-auditor-0aff70148dbe.herokuapp.com/accounts/:accountId/transactions';

const generateData = (num) =>
  Array.from({ length: num }, (_, index) => ({
    id: index + 1,
    name: `User ${index + 1}`,
    email: `user${index + 1}@example.com`,
    address: `Address ${index + 1}`,
    phone: `123-456-789${index % 10}`,
  }));

// Mock column names
const columns = [
  { id: 'date', label: 'Date' },
  { id: 'account', label: 'Account' },
  { id: 'deposit', label: 'Amount' },
  { id: 'currency', label: 'Currency' },
];

const Transactions = ({ accountId }: TransactionProps) => {
  const [data, setData] = useState<TransactionResponse[]>([]);
  const [filteredData, setFilteredData] = useState<Transaction[]>([]);
  const [connectionActive, setConnectionActive] = useState<boolean>(false);
  const [connectionLoading, setConnectionLoading] = useState<boolean>(false);
  const wsRef = useRef<WebSocket | null>(null);

  const handleNewTransaction = useCallback(
    (transaction: TransactionResponse) => {
      // Add the new transaction to the dataset
      setData((prevData) => [transaction, ...prevData]);
    },
    [setData]
  );

  const connectWebSocket = useCallback(() => {
    if (wsRef.current) {
      console.warn('WebSocket is already open.');
      return;
    }

    const activeWebSocketUrl = WEBSOCKET_URL.replace(':accountId', accountId);
    const ws = new WebSocket(`${activeWebSocketUrl}`);
    wsRef.current = ws;
    
    ws.onopen = () => {
      console.log('WebSocket connection established');
      setConnectionActive(true);
      setConnectionLoading(false);
    };
    
    ws.onmessage = (event) => {
      try {
        const transaction = JSON.parse(event.data);
        console.log('RECEIVED =>', transaction);
        handleNewTransaction(transaction);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };
    
    ws.onclose = () => {
      console.log('WebSocket connection closed');
      setConnectionActive(false);
      setConnectionLoading(false);
      wsRef.current = null;
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      ws.close();
    };
  }, [accountId, handleNewTransaction]);

  const disconnectWebSocket = useCallback(() => {
    if (wsRef.current) {
      console.log('🚨 Closing WebSocket connection', wsRef.current.readyState);
      if (wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.close();
        wsRef.current = null;
      }
    }
  }, []);

  const toggleConnection = () => {
    setConnectionLoading(true);
    if (connectionActive) return disconnectWebSocket();
    connectWebSocket();
  };

  useEffect(() => {
    toggleConnection();

    // Cleanup WebSocket connection on component unmount
    return () => {
      disconnectWebSocket();
    };
  }, [connectWebSocket, disconnectWebSocket]);

  return (
    <>
      <TransactionFilters />
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
