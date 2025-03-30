import { Tag } from '../models/models';

export interface Transaction {
  id: string;
  name: string;
  amount: number;
  dateCreated: Date;
  tags: Tag[] | [];
}
