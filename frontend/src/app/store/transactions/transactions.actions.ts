import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Transaction } from './transactions.model';

export const TransactionsActions = createActionGroup({
  source: 'Transactions',
  events: {
    'App Loaded': emptyProps(),
    'Analytics Component Loaded': emptyProps(),
    'Dashboard Component Loaded': emptyProps(),
    'Transaction Tags Updated': props<{
      transactionId: string;
      tagsIds: string[];
    }>(),
    'Transactions Filtered': props<{ tagsIds: string[] }>(),
    'Transactions Filter Reset': emptyProps(),
    'Reset Mock Data': emptyProps(),
  },
});

export const TransactionsApiActions = createActionGroup({
  source: 'Transactions API',
  events: {
    'Retrieved Transactions': props<{
      transactions: ReadonlyArray<Transaction>;
    }>(),
    'Retrieved Tagless Transactions': props<{
      transactions: ReadonlyArray<Transaction>;
    }>(),
    'Updated Transaction Tags': emptyProps(),
    'Filtered Transactions': props<{
      transactions: ReadonlyArray<Transaction>;
    }>(),
    'Mock Data Reset': emptyProps(),
  },
});
