import { createActionGroup, props } from '@ngrx/store';
import { Tag } from '../models/models';
import { Transaction } from './transactions.model';

export const TransactionsActions = createActionGroup({
  source: 'Transactions',
  events: {
    'Transaction Tags Updated': props<{ transactionId: string; tags: Tag[] }>(),
    'Transactions Retreived': props<{
      transactions: Transaction[];
    }>(),
  },
});
