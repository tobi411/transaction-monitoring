'use client';
import React from 'react';
import Table from './Table';
import TransactionFilters from './TransactionFilters';
import ConnectionStatus from './ConnectionStatus';

type Props = {};

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
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Name' },
  { id: 'email', label: 'Email' },
  { id: 'address', label: 'Address' },
  { id: 'phone', label: 'Phone' },
];

const Transactions = (props: Props) => {
  const data = generateData(1000);
  return (
    <>
      <TransactionFilters />
      <ConnectionStatus />
      <Table rows={data} columns={columns} height={320} rowHeight={45} width={'100%'} />
    </>
  );
};

export default Transactions;
