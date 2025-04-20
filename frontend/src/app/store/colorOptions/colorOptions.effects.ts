import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { ColorOptionsApi } from '../../api/colorOptions.api';
import { ColorOption } from './colorOptions.model';
import {
  ColorOptionsActions,
  ColorOptionsApiActions,
} from './colorOptions.actions';

@Injectable()
export class TagEffects {
  actions$ = inject(Actions);
  store = inject(Store);
  colorOptionsApi = inject(ColorOptionsApi);

  pullFreshTagsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ColorOptionsActions.appLoaded),
      exhaustMap(() =>
        this.colorOptionsApi.getColorOptions().pipe(
          map((colorOptions: ReadonlyArray<ColorOption>) =>
            ColorOptionsApiActions.retreivedColorOptions({ colorOptions })
          ),
          catchError(() => EMPTY)
        )
      )
    );
  });
}
