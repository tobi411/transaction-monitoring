import { Account } from '../lib/types';

interface MainProps {
  accounts: Account[];
}

export default function Main({ accounts }: MainProps) {
  console.log('accounts', accounts);
  return (
    <div>
      <p>Content goes here</p>
    </div>
  );
}
