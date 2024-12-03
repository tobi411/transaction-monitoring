export type AccountResponse = {
  accountId: string;
  accountName: string;
  currency: 'USD' | 'CAD' | 'EUR' | 'GBP' | 'AUD' | 'JPY';
  country: string;
  address: string;
  phoneNumber: string;
  email: string;
};

export type TransactionResponse = {
  transactionId: string;
  direction: 'inflow' | 'outflow';
  amount: number;
  currency: 'USD' | 'CAD' | 'EUR' | 'GBP' | 'AUD' | 'JPY';
  destinationId: string;
  destinationName: string;
  sourceId: string;
  sourceName: string;
  timestamp: string;
};

export type Filters = {
  minAmount?: number;
  maxAmount?: number;
  currencies?: string[];
};

export enum API_STATUS {
  LOADING = 'LOADING',
  FAILED = 'FAILED',
  COMPLETED = 'COMPLETED',
}
