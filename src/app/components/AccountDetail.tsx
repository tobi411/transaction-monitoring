'use client';
import React from 'react';

type Props = {
  label: string;
  value: string;
};

const AccountDetail = ({ label, value }: Props) => {
  return (
    <div>
      <label className='text-xs font-semibold'>{label}</label>
      <p className='text-gray-800 text-sm'>{value}</p>
    </div>
  );
};

export default AccountDetail;
