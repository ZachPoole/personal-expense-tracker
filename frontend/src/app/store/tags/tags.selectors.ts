import { createFeatureSelector } from '@ngrx/store';
import { Tag, TagStoreState } from './tags.model';

export const selectTagsStoreState =
  createFeatureSelector<TagStoreState>('tags');
