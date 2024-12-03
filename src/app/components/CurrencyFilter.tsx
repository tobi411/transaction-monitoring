'use client';
import React, { useState } from 'react';

type Props = {
  availableCurrencies: string[];
  selectedCurrencies?: string[];
  onChange: (selectedCurrencies: string[]) => void;
};

const CurrencyFilter = ({
  availableCurrencies,
  selectedCurrencies,
  onChange
}: Props) => {
  const handleCheckboxChange = (currency: string) => {
    const updatedCurrencies = selectedCurrencies?.includes(currency)
      ? selectedCurrencies.filter((c) => c !== currency)
      : [...(selectedCurrencies || []), currency];

    onChange(updatedCurrencies);
  };

  return (
    <div className='flex flex-col'>
      <label className='font-bold mb-1 text-xs'>Currency</label>
      <div className='grid grid-cols-3 gap-2'>
        {availableCurrencies.map((currency) => (
          <label key={currency} className='flex items-center space-x-2'>
            <input
              type='checkbox'
              value={currency}
              checked={selectedCurrencies?.includes(currency)}
              onChange={() => handleCheckboxChange(currency)}
            />
            <span className='text-sm'>{currency}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CurrencyFilter;
