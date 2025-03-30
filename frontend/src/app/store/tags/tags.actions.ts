import { createActionGroup, props } from '@ngrx/store';
import { Tag } from './tags.model';

export const TagsActions = createActionGroup({
  source: 'Tags',
  events: {
    'Tags Retreived': props<{ tags: Tag[] }>(),
    'Tag Created': props<{ tag: Tag }>(),
    'Tag Deleted': props<{ tagId: string }>(),
  },
});
