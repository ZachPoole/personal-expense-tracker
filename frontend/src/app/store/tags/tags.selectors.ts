import { createFeatureSelector } from '@ngrx/store';
import { TagStoreState } from './tags.model';

export const selectTagsStoreState =
  createFeatureSelector<TagStoreState>('tags');
