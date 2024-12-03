'use client';
import React, { useState } from 'react';

type Props = {
  availableCurrencies: string[];
  onChange: (selectedCurrencies: string[]) => void;
};

const CurrencyFilter = ({ availableCurrencies, onChange }: Props) => {
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([]);

  const handleCheckboxChange = (currency: string) => {
    const updatedCurrencies = selectedCurrencies.includes(currency)
      ? selectedCurrencies.filter((c) => c !== currency)
      : [...selectedCurrencies, currency];

    setSelectedCurrencies(updatedCurrencies);
    onChange(updatedCurrencies);
  };

  return (
    <div className="flex flex-col">
      <label className="font-medium mb-1">Transaction Currencies</label>
      <div className="grid grid-cols-3 gap-2">
        {availableCurrencies.map((currency) => (
          <label key={currency} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={currency}
              checked={selectedCurrencies.includes(currency)}
              onChange={() => handleCheckboxChange(currency)}
            />
            <span>{currency}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CurrencyFilter;