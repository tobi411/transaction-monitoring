'use client';
import React, { useState } from 'react';
import AmountFilter from './AmountFilter';
import CurrencyFilter from './CurrencyFilter';
import { Filters } from 'app/lib/types';

type Props = {
  filters: Filters;
  onFilterChange: (filters: {
    minAmount?: number;
    maxAmount?: number;
    currencies?: string[];
  }) => void;
  availableCurrencies: string[];
};

const TransactionFilters = ({ filters, onFilterChange, availableCurrencies }: Props) => {
  // const [filters, setFilters] = useState({
  //   minAmount: undefined,
  //   maxAmount: undefined,
  //   currencies: [],
  // });

  const handleAmountChange = (
    min: number | undefined,
    max: number | undefined
  ) => {
    const updatedFilters = { ...filters, minAmount: min, maxAmount: max };
    // setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleCurrencyChange = (currencies: string[]) => {
    const updatedFilters = { ...filters, currencies };
    // setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className='p-4 bg-gray-100 rounded-md space-y-4'>
      <h2 className='text-sm font-semibold'>Filter Transactions</h2>
      <AmountFilter onChange={handleAmountChange} />
      <CurrencyFilter
        availableCurrencies={availableCurrencies}
        onChange={handleCurrencyChange}
      />
    </div>
  );
};

export default TransactionFilters;
