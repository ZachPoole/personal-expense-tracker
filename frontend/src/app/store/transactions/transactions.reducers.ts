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
  )
  // on(
  //   TransactionsActions.transactionTagsUpdated,
  //   (_state, { transactionId, tagsIds }) => ({
  //     ..._state,
  //     transactions: _state.transactions.map((t) => {
  //       if (t.id === transactionId) {
  //         return { ...t, tags: tagsIds };
  //       } else {
  //         return t;
  //       }
  //     }),
  //   })
  // ),
  // on(
  //   TransactionsActions.allTransactionTagsUpdated,
  //   (_state, { transactions }) => ({ ..._state, transactions: transactions })
  // )
);
