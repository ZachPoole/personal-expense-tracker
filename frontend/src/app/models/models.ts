export interface Tag {
  transactionName: string;
  tagName: string;
  color: string;
}

export interface Transaction {
  transactionName: string;
  amount: number;
  dateCreated: Date;
}
