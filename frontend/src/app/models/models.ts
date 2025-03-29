export interface Tag {
  tagId: string;
  tagName: string;
  color: string;
}

export interface Transaction {
  transactionName: string;
  amount: number;
  dateCreated: Date;
  tags: Tag[] | [];
}
