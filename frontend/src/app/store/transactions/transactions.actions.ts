import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Transaction } from './transactions.model';

export const TransactionsActions = createActionGroup({
  source: 'Transactions',
  events: {
    'Transaction Tags Updated': props<{
      transactionId: string;
      tagsIds: string[];
    }>(),
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
  },
});
