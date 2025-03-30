import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, withLatestFrom } from 'rxjs/operators';
import { TagsActions } from './tags.actions';
import { selectTransactions } from './tags.selectors';
import { Tag } from './tags.model';
import { TransactionsActions } from '../transactions/transactions.actions';

@Injectable()
export class TagEffects {
  constructor(private actions$: Actions, private store: Store) {}

  // Listen for deleteTag action and trigger updateTransactions action
  deleteTagEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TagsActions.tagDeleted), // When deleteTag action is dispatched
      withLatestFrom(this.store.select(selectTransactions)), // Get current transactions
      map(([action, transactions]) => {
        const updatedTransactions = transactions.map((transaction) => ({
          ...transaction,
          tags: transaction.tags.filter((tag: Tag) => tag.id !== action.tagId), // Remove tag from transactions
        }));

        return TransactionsActions.allTransactionTagsUpdated({
          transactions: updatedTransactions,
        });
      })
    )
  );
}
