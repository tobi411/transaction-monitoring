'use client';

import React from 'react';
import { Account } from '../lib/types';

interface AccountDetailsProps {
  account?: Account;
}

const AccountDetails = ({ account }: AccountDetailsProps) => {
  if (!account) return null;
  return <div>AccountDetails</div>;
};

export default AccountDetails;
