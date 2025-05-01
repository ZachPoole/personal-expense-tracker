import { ColorOption } from '../colorOptions/colorOptions.model';

export interface Tag {
  id: string;
  name: string;
  color: ColorOption;
}

export interface TagWithSelection extends Tag {
  selected: boolean;
}

export interface TagStoreState {
  initialized: boolean;
  tags: ReadonlyArray<Tag>;
}
