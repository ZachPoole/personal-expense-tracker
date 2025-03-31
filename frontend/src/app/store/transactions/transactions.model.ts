import { Tag } from '../tags/tags.model';

export interface Transaction {
  id: string;
  name: string;
  amount: number;
  dateCreated: Date;
  tags: Tag[] | [];
}

export interface TransactionsStoreState {
  initialized: boolean;
  transactions: Transaction[];
}
