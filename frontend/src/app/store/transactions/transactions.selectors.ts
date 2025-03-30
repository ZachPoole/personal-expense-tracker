import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Transaction } from './transactions.model';

export const selectTransactions =
  createFeatureSelector<Transaction[]>('transactions');

export const selectTaglessTransasctions = createSelector(
  selectTransactions,
  (transactions) => {
    return transactions.filter((transaction) => transaction.tags.length === 0);
  }
);
