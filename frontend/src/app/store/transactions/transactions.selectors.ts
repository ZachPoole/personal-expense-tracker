import { createFeatureSelector } from '@ngrx/store';
import { Transaction } from './transactions.model';

export const selectTransactions =
  createFeatureSelector<Transaction[]>('transactions');
