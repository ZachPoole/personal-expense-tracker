import { createActionGroup, props } from '@ngrx/store';
import { Tag } from './tags.model';

export const TagsActions = createActionGroup({
  source: 'Tags',
  events: {
    'Seed Tag State': props<{ tags: Tag[] }>(),
    'Tag Created': props<{ tag: Tag }>(),
    'Tag Deleted': props<{ tagId: string }>(),
  },
});
