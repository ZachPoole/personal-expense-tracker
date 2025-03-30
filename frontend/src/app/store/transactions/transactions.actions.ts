import { createActionGroup, props } from '@ngrx/store';
import { Transaction } from './transactions.model';
import { Tag } from '../tags/tags.model';

export const TransactionsActions = createActionGroup({
  source: 'Transactions',
  events: {
    'Transactions Retreived': props<{
      transactions: Transaction[];
    }>(),
    'Transaction Tags Updated': props<{ transactionId: string; tags: Tag[] }>(),
    'All Transaction Tags Updated': props<{ transactions: Transaction[] }>(),
  },
});
