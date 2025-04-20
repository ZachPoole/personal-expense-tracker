import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import {
  TransactionsActions,
  TransactionsApiActions,
} from '../transactions/transactions.actions';
import { TransactionsApi } from '../../api/transactions.api';
import { EMPTY } from 'rxjs';
import { Transaction } from './transactions.model';

@Injectable()
export class TransactionEffects {
  actions$ = inject(Actions);
  store = inject(Store);
  transactionApi = inject(TransactionsApi);

  // Listen for updateTransactionTags action and trigger updateTransactions api call
  updateTransactionTagsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TransactionsActions.transactionTagsUpdated),
      exhaustMap((actionData) =>
        this.transactionApi
          .updateTransactionTags({
            TransactionId: actionData.transactionId,
            TagsIds: actionData.tagsIds,
          })
          .pipe(
            map(() => TransactionsApiActions.updatedTransactionTags()),
            catchError(() => EMPTY)
          )
      )
    );
  });

  pullFreshTaglessTransactionsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TransactionsApiActions.updatedTransactionTags),
      exhaustMap(() =>
        this.transactionApi.getTaglessTransactions().pipe(
          map((transactions: ReadonlyArray<Transaction>) =>
            TransactionsApiActions.retrievedTaglessTransactions({
              transactions,
            })
          ),
          catchError(() => EMPTY)
        )
      )
    );
  });

  // pullFreshTransactionsEffect$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(),
  //     exhaustMap(() =>
  //       this.transactionApi.getTransactions().pipe(
  //         map((transactions: ReadonlyArray<Transaction>) =>
  //           TransactionsApiActions.retrievedTransactions({ transactions })
  //         ),
  //         catchError(() => EMPTY)
  //       )
  //     )
  //   );
  // });
}
