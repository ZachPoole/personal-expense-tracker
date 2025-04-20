import { createReducer, on } from '@ngrx/store';
import { TransactionsStoreState } from './transactions.model';
import {
  TransactionsActions,
  TransactionsApiActions,
} from './transactions.actions';

export const transactionsInitialState: TransactionsStoreState = {
  initialized: false,
  transactions: [],
};

export const transactionsReducer = createReducer(
  transactionsInitialState,
  on(
    TransactionsApiActions.retrievedTransactions,
    (_state, { transactions }) => ({
      initialized: true,
      transactions: transactions,
    })
  ),
  on(
    TransactionsApiActions.retrievedTaglessTransactions,
    (_state, { transactions }) => ({
      initialized: true,
      transactions: transactions,
    })
  ),
  on(
    TransactionsApiActions.filteredTransacions,
    (_state, { transactions }) => ({
      initialized: true,
      transactions: transactions,
    })
  )
);
