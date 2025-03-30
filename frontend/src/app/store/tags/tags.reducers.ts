import { createReducer, on } from '@ngrx/store';
import { Tag } from './tags.model';
import { TagsActions } from './tags.actions';

export const mockTags: Tag[] = [
  {
    id: '8b2fefcf-524d-4a05-91e2-98eca2494ae8',
    name: 'Food',
    color: 'red',
  },
  {
    id: '10442c98-b63e-4617-bd52-6fe6299122fd',
    name: 'Essentials',
    color: 'orange',
  },
  {
    id: '55f592e3-1a77-4d7d-beca-6077a1f9c79e',
    name: 'Utilities',
    color: 'yellow',
  },
  {
    id: 'b0f8eae0-ec28-433a-9dbe-f8f6e64ed4bd',
    name: 'Entertainment',
    color: 'green',
  },
  {
    id: 'c6dd2b34-f991-4d3c-a2ae-b211c275a633',
    name: 'Food',
    color: 'blue',
  },
  {
    id: '0eef4293-d958-4cc2-b213-913bbcfe5d4f',
    name: 'Transportation',
    color: 'indigo',
  },
  {
    id: '7be4efce-e20f-46cf-a5f6-ecf9d2c81dbe',
    name: 'Health',
    color: 'violet',
  },
  {
    id: '52aa0107-91a3-496b-8863-eac359c15037',
    name: 'Entertainment',
    color: 'pink',
  },
  {
    id: 'a7dd49e2-614d-4741-8051-221288d35530',
    name: 'Retail',
    color: 'blue',
  },
  {
    id: '2cbe613b-0b92-482e-b586-0a75fdd6c8f1',
    name: 'Maintenance',
    color: 'blue',
  },
];

export const initialState: Tag[] = mockTags;

export const tagsReducer = createReducer(
  initialState,
  on(TagsActions.tagsRetreived, (_state, { tags }) => tags),
  on(TagsActions.tagCreated, (_state, { tag }) => [..._state, tag]),
  on(TagsActions.tagDeleted, (_state, { tagId }) =>
    _state.filter((tag: Tag) => tag.id !== tagId)
  )
);
