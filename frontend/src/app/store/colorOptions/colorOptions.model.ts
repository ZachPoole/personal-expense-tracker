export interface ColorOption {
  id: string;
  color: string;
  order: number;
}

export interface ColorOptionsStoreState {
  initialized: boolean;
  colorOptions: ColorOption[];
}
