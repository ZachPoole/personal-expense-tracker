import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Transaction, TransactionsStoreState } from './transactions.model';

export const selectTransactionsStoreState =
  createFeatureSelector<TransactionsStoreState>('transactions');
