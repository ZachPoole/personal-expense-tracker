import { createReducer, on } from '@ngrx/store';
import { ColorOptionsStoreState } from './colorOptions.model';
import { ColorOptionsActions } from './colorOptions.actions';

export const colorOptionsInitialState: ColorOptionsStoreState = {
  initialized: false,
  colorOptions: [],
};

export const colorOptionsReducer = createReducer(
  colorOptionsInitialState,
  on(ColorOptionsActions.seedColorOptionState, (_state, { colorOptions }) => ({
    initialized: true,
    colorOptions: colorOptions,
  }))
);
