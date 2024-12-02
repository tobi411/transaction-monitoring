'use client';
import { useMemo, useState } from 'react';
import { Account } from '../lib/types';
import Dropdown from './Dropdown';
import AccountDetails from './AccountDetails';

interface MainProps {
  accounts: Account[];
}

export default function Main({ accounts }: MainProps) {
  const [selectedAccountId, setSelectedAccountId] = useState<string>();

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
    <div className='container mx-auto py-6'>
      <Dropdown
        label='Account'
        options={dropdownOptions}
        value={selectedAccount?.accountName}
        onClick={(value) => setSelectedAccountId(value)}
      />
      <AccountDetails account={selectedAccount} />
    </div>
  );
}
