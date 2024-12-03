'use client';
import React, { useState } from 'react';

type Props = {
  onChange: (min: number | undefined, max: number | undefined) => void;
};

const AmountFilter = ({ onChange }: Props) => {
  const [minAmount, setMinAmount] = useState<number | undefined>(undefined);
  const [maxAmount, setMaxAmount] = useState<number | undefined>(undefined);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseFloat(e.target.value) : undefined;
    setMinAmount(value);
    onChange(value, maxAmount);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseFloat(e.target.value) : undefined;
    setMaxAmount(value);
    onChange(minAmount, value);
  };

  return (
    <div className="flex flex-col">
      <label className="font-medium mb-1 text-sm">Amount Range</label>
      <div className="flex space-x-4">
        <input
          type="number"
          placeholder="Min"
          className="p-2 border rounded-md w-full"
          value={minAmount ?? ''}
          onChange={handleMinChange}
        />
        <input
          type="number"
          placeholder="Max"
          className="p-2 border rounded-md w-full"
          value={maxAmount ?? ''}
          onChange={handleMaxChange}
        />
      </div>
    </div>
  );
};

export default AmountFilter;