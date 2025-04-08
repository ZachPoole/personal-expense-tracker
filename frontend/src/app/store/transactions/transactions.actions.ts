import { createActionGroup, props } from '@ngrx/store';
import { Transaction } from './transactions.model';
import { Tag } from '../tags/tags.model';

export const TransactionsActions = createActionGroup({
  source: 'Transactions',
  events: {
    'Transaction Tags Updated': props<{ transactionId: string; tags: Tag[] }>(),
    'All Transaction Tags Updated': props<{ transactions: Transaction[] }>(),
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
  },
});
