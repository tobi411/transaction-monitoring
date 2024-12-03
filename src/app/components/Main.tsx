'use client';
import { useEffect, useMemo, useState } from 'react';
import { AccountResponse, API_STATUS } from '../lib/types';
import Dropdown from './Dropdown';
import Account from './Account';
import axios from 'axios';
import Banner from './Banner';

export default function Main() {
  const [accounts, setAccounts] = useState<Array<AccountResponse>>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<string>();
  const [fetchAccountStatus, setFetchAccountState] = useState<API_STATUS>();

  const getAccounts = async () => {
    try {
      setFetchAccountState(API_STATUS.LOADING);
      const response = await axios.get(
        'https://paloma-financial-auditor-0aff70148dbe.herokuapp.com/accounts'
      );
      const accountsResponse = response.data.data;
      setFetchAccountState(API_STATUS.COMPLETED);
      setAccounts(accountsResponse);
    } catch (e) {
      console.log('error getting accounts');
      setFetchAccountState(API_STATUS.FAILED);
    }
  };

  useEffect(() => {
    getAccounts();
  }, []);

  const selectedAccount = useMemo(() => {
    if (!selectedAccountId || accounts?.length === 0) return undefined;
    return accounts?.find((account) => account.accountId === selectedAccountId);
  }, [selectedAccountId, accounts]);

  const dropdownOptions = useMemo(() => {
    return accounts.map((account) => ({
      label: account.accountName,
      value: account.accountId,
      id: account.accountId,
    }));
  }, [accounts]);

  return (
    <>
      {fetchAccountStatus === API_STATUS.FAILED && <Banner />}
      <div className='container mx-auto py-6'>
        <div className='flex'>
          <Dropdown
            label='Account'
            options={dropdownOptions}
            value={selectedAccount?.accountName}
            onClick={(value) => setSelectedAccountId(value)}
          />
          <Account account={selectedAccount} />
        </div>
      </div>
    </>
  );
}
