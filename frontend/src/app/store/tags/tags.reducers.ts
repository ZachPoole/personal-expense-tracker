import { createReducer, on } from '@ngrx/store';
import { Tag, TagStoreState } from './tags.model';
import { TagsActions, TagsApiActions } from './tags.actions';

export const tagsInitialState: TagStoreState = { initialized: false, tags: [] };

export const tagsReducer = createReducer(
  tagsInitialState,
  on(TagsApiActions.retreivedTags, (_state, { tags }) => ({
    initialized: true,
    tags: tags,
  })),
  on(TagsActions.tagCreated, (_state, { tag }) => ({
    ..._state,
    tags: [..._state.tags, tag],
  })),
  on(TagsActions.tagDeleted, (_state, { tagId }) => ({
    ..._state,
    tags: _state.tags.filter((tag: Tag) => tag.id !== tagId),
  }))
);
