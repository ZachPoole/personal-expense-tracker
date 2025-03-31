import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Transaction, TransactionsStoreState } from './transactions.model';

export const selectTransactionsStoreState =
  createFeatureSelector<TransactionsStoreState>('transactions');

export const selectTaglessTransasctions = createSelector(
  selectTransactionsStoreState,
  (transactionStoreState) => ({
    ...transactionStoreState,
    transactions: transactionStoreState.transactions.filter(
      (transaction) => transaction.tags.length === 0
    ),
  })
);
