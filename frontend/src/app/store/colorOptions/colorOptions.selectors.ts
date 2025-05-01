import { createFeatureSelector } from '@ngrx/store';
import { ColorOptionsStoreState } from './colorOptions.model';

export const selectColorOptionsStoreState =
  createFeatureSelector<ColorOptionsStoreState>('colorOptions');
