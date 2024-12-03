'use client';
import React, { useState } from 'react';

type Props = {
  minAmount?: number
  maxAmount?: number
  onChange: (min: number | undefined, max: number | undefined) => void;
};

const AmountFilter = ({ minAmount, maxAmount, onChange }: Props) => {

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseFloat(e.target.value) : undefined;
    onChange(value, maxAmount);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseFloat(e.target.value) : undefined;
    onChange(minAmount, value);
  };

  return (
    <div className="flex flex-col">
      <label className="font-bold mb-1 text-xs">Amount Range</label>
      <div className="flex space-x-4">
        <input
          type="number"
          placeholder="Min"
          className="text-sm p-2 border rounded-md w-full"
          value={minAmount ?? ''}
          onChange={handleMinChange}
        />
        <input
          type="number"
          placeholder="Max"
          className="text-sm p-2 border rounded-md w-full"
          value={maxAmount ?? ''}
          onChange={handleMaxChange}
        />
      </div>
    </div>
  );
};

export default AmountFilter;