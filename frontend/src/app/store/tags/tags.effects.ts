import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { TagsActions, TagsApiActions } from './tags.actions';
import { TagsApi } from '../../api/tags.api';
import { EMPTY } from 'rxjs';
import { Tag } from './tags.model';

@Injectable()
export class TagEffects {
  actions$ = inject(Actions);
  store = inject(Store);
  tagsApi = inject(TagsApi);

  // Listen for deleteTag action and trigger updateTransactions action
  deleteTagEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TagsActions.tagDeleted),
      exhaustMap((actionData) =>
        this.tagsApi.deleteTag(actionData.tagId).pipe(
          map(() => TagsApiActions.deletedTag()),
          catchError(() => EMPTY)
        )
      )
    );
  });

  createTagEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TagsActions.tagCreated),
      exhaustMap((actionData) =>
        this.tagsApi
          .createTag({
            Name: actionData.tag.name,
            ColorId: actionData.tag.color.id,
          })
          .pipe(
            map(() => TagsApiActions.createdTag()),
            catchError(() => EMPTY)
          )
      )
    );
  });

  pullFreshTagsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        TagsActions.appLoaded,
        TagsApiActions.deletedTag,
        TagsApiActions.createdTag
      ),
      exhaustMap(() =>
        this.tagsApi.getTags().pipe(
          map((tags: ReadonlyArray<Tag>) =>
            TagsApiActions.retreivedTags({ tags })
          ),
          catchError(() => EMPTY)
        )
      )
    );
  });
}
