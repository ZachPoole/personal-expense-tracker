import { Tag } from '../tags/tags.model';

export interface Transaction {
  id: string;
  name: string;
  amount: number;
  dateCreated: Date;
  tags: Tag[] | [];
}
