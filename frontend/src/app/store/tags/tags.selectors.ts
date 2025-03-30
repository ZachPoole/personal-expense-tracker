import { createFeatureSelector } from '@ngrx/store';
import { Tag } from './tags.model';

export const selectTags = createFeatureSelector<Tag[]>('tags');
