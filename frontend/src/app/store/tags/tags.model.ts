export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface TagWithSelection extends Tag {
  selected: boolean;
}

export interface TagStoreState {
  initialized: boolean;
  tags: Tag[];
}
