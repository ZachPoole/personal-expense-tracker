import { createActionGroup, props } from '@ngrx/store';
import { Tag } from './tags.model';

export const TagsActions = createActionGroup({
  source: 'Tags',
  events: {
    'Tag Created': props<{ tag: Tag }>(),
    'Tag Deleted': props<{ tagId: string }>(),
  },
});

export const TagsApiActions = createActionGroup({
  source: 'Tags API',
  events: {
    'Retreived Tags': props<{ tags: ReadonlyArray<Tag> }>(),
  },
});
