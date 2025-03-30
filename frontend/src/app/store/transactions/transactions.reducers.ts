import { createReducer, on } from '@ngrx/store';
import { Transaction } from './transactions.model';
import { TransactionsActions } from './transactions.actions';

export const mockTransactions: Transaction[] = [
  {
    id: 'f3b1a2e8-6d3f-4c88-bf4a-4a5d2f6e8c3a',
    name: 'Grocery Shopping',
    amount: 150.75,
    dateCreated: new Date('2024-03-25T10:30:00Z'),
    tags: [],
  },
  {
    id: '1a9f4b56-8439-4f77-8b19-60e514c934ea',
    name: 'Electric Bill',
    amount: 90.25,
    dateCreated: new Date('2024-03-20T08:15:00Z'),
    tags: [],
  },
  {
    id: 'bdf4c3a0-77a4-4669-91fd-1463e12b759b',
    name: 'Dinner Out',
    amount: 60.0,
    dateCreated: new Date('2024-03-22T19:45:00Z'),
    tags: [
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
    ],
  },
  {
    id: 'c0170d07-9235-44c2-bd3c-e41adf63de5b',
    name: 'Gas Refill',
    amount: 45.0,
    dateCreated: new Date('2024-03-18T14:30:00Z'),
    tags: [
      {
        id: '0eef4293-d958-4cc2-b213-913bbcfe5d4f',
        name: 'Transportation',
        color: 'indigo',
      },
    ],
  },
  {
    id: 'f55c71c3-7f49-4e3d-9f3e-463c2d82a6eb',
    name: 'Gym Membership',
    amount: 30.0,
    dateCreated: new Date('2024-03-15T07:00:00Z'),
    tags: [
      {
        id: '7be4efce-e20f-46cf-a5f6-ecf9d2c81dbe',
        name: 'Health',
        color: 'violet',
      },
    ],
  },
  {
    id: 'ad15e6fb-41cb-45c9-a891-31783eeb5d1f',
    name: 'Movie Night',
    amount: 25.0,
    dateCreated: new Date('2024-03-14T20:00:00Z'),
    tags: [
      {
        id: '52aa0107-91a3-496b-8863-eac359c15037',
        name: 'Entertainment',
        color: 'pink',
      },
    ],
  },
  {
    id: '4c3e62a6-9b7f-4e47-88a6-10a9d6445f85',
    name: 'Online Shopping',
    amount: 120.5,
    dateCreated: new Date('2024-03-10T15:25:00Z'),
    tags: [
      {
        id: 'a7dd49e2-614d-4741-8051-221288d35530',
        name: 'Retail',
        color: 'blue',
      },
    ],
  },
  {
    id: '8d6b02ae-89a4-4b56-b46f-3c6d5fc5642b',
    name: 'Car Repair',
    amount: 300.0,
    dateCreated: new Date('2024-03-08T09:45:00Z'),
    tags: [
      {
        id: '2cbe613b-0b92-482e-b586-0a75fdd6c8f1',
        name: 'Maintenance',
        color: 'blue',
      },
    ],
  },
  {
    id: 'c4109d3f-61b1-4d5d-86e7-f6e1e7fd6e6c',
    name: 'Rent Payment',
    amount: 1200.0,
    dateCreated: new Date('2024-03-01T12:00:00Z'),
    tags: [
      {
        id: '55f592e3-1a77-4d7d-beca-6077a1f9c79e',
        name: 'Utilities',
        color: 'yellow',
      },
      {
        id: '10442c98-b63e-4617-bd52-6fe6299122fd',
        name: 'Essentials',
        color: 'orange',
      },
    ],
  },
  {
    id: '44fa9b69-7a34-4bfc-8777-1e734c2f4c4a',
    name: 'Concert Ticket',
    amount: 75.0,
    dateCreated: new Date('2024-02-28T18:30:00Z'),
    tags: [
      {
        id: 'b0f8eae0-ec28-433a-9dbe-f8f6e64ed4bd',
        name: 'Entertainment',
        color: 'green',
      },
    ],
  },
];

export const initialState: Transaction[] = mockTransactions;

export const transactionsReducer = createReducer(
  initialState,
  on(
    TransactionsActions.transactionsRetreived,
    (_state, { transactions }) => transactions
  ),
  on(
    TransactionsActions.transactionTagsUpdated,
    (_state, { transactionId, tags }) =>
      _state.map((t) => {
        if (t.id === transactionId) {
          return { ...t, tags: tags };
        } else {
          return t;
        }
      })
  )
);
