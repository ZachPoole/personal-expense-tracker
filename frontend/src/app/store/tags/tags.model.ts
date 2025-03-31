export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface TagSelected extends Tag {
  selected: boolean;
}

export interface TagStoreState {
  initialized: boolean;
  tags: Tag[];
}
