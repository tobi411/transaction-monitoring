import Main from '@/components/Main';
import axios from 'axios';

export default async function Home() {
  const data = await axios.get(
    'https://paloma-financial-auditor-0aff70148dbe.herokuapp.com/accounts'
  );
  const accounts = await data.data;

  return <Main accounts={accounts?.data} />;
}
