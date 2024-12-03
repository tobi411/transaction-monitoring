'use client';
import { useEffect, useMemo, useState } from 'react';
import { AccountResponse, API_STATUS } from '../lib/types';
import Dropdown from './Dropdown';
import Account from './Account';
import axios from 'axios';
import Banner from './Banner';

const ACCOUNT_STORAGE_KEY = 'selectedAccount';

export default function Main() {
  const [accounts, setAccounts] = useState<Array<AccountResponse>>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<string>();
  const [fetchAccountStatus, setFetchAccountState] = useState<API_STATUS>();

  const selectedAccountInStorage = localStorage.getItem(ACCOUNT_STORAGE_KEY);

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

  useEffect(() => {
    if (selectedAccountInStorage) {
      setSelectedAccountId(selectedAccountInStorage);
    }
  }, [selectedAccountInStorage]);

  const dropdownOptions = useMemo(() => {
    return accounts.map((account) => ({
      label: account.accountName,
      value: account.accountId,
      id: account.accountId,
    }));
  }, [accounts]);

  const handleAccountSelected = (value: string) => {
    setSelectedAccountId(value);
    localStorage.setItem(ACCOUNT_STORAGE_KEY, value);
  };

  return (
    <>
      {fetchAccountStatus === API_STATUS.FAILED && <Banner />}
      <div className='container mx-auto py-6'>
        <div className='flex'>
          <Dropdown
            label='Account'
            options={dropdownOptions}
            value={selectedAccount?.accountName}
            onClick={(value) => handleAccountSelected(value)}
          />
          <Account account={selectedAccount} />
        </div>
      </div>
    </>
  );
}
