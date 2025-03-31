import { createFeatureSelector } from '@ngrx/store';
import { Tag, TagStoreState } from './tags.model';

export const selectTags = createFeatureSelector<TagStoreState>('tags');
