'use client';
import React from 'react';
import { AccountResponse } from '../lib/types';
import Card from './Card';
import AccountDetail from './AccountDetail';
import Header from './Header';
import Subheader from './Subheader';
import Transactions from './Transactions';

interface AccountDetailsProps {
  account?: AccountResponse;
}

const Account = ({ account }: AccountDetailsProps) => {
  if (!account) return null;
  return (
    <div className='w-full ml-3'>
      <Card>
        <Header value={account.accountName} />
        <div className='grid grid-cols-3 gap-4'>
          <AccountDetail label='Address' value={account.address} />
          <AccountDetail label='Country' value={account.country} />
          <AccountDetail label='Currency' value={account.currency} />
          <AccountDetail label='Email' value={account.email} />
          <AccountDetail
            label='Phone number'
            value={account.phoneNumber}
          />
          <AccountDetail label='Account ID' value={account.accountId} />
        </div>
      </Card>
      <Card>
        <Subheader value='Transactions' />
        <Transactions />
      </Card>
    </div>
  );
};

export default Account;
