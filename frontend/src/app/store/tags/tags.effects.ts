import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, withLatestFrom } from 'rxjs/operators';
import { TagsActions } from './tags.actions';
import { Tag } from './tags.model';
import { TransactionsActions } from '../transactions/transactions.actions';
import { Transaction } from '../transactions/transactions.model';
import { selectTransactionsStoreState } from '../transactions/transactions.selectors';

@Injectable()
export class TagEffects {
  actions$ = inject(Actions);
  store = inject(Store);

  // Listen for deleteTag action and trigger updateTransactions action
  deleteTagEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TagsActions.tagDeleted), // When deleteTag action is dispatched
      withLatestFrom(this.store.select(selectTransactionsStoreState)), // Get current transactions
      map(([action, transactionsStoreState]) => {
        const updatedTransactions = transactionsStoreState.transactions.map(
          (transaction: Transaction) => ({
            ...transaction,
            tags: transaction.tags.filter(
              (tag: Tag) => tag.id !== action.tagId
            ), // Remove tag from transactions
          })
        );

        return TransactionsActions.allTransactionTagsUpdated({
          transactions: updatedTransactions,
        });
      })
    )
  );
}
