import {
  Component,
  effect,
  OnChanges,
  signal,
  SimpleChanges,
} from '@angular/core';
import { Transaction } from '../../models/models';
import { CommonModule } from '@angular/common';
import { TransactionCardComponent } from '../../components/transaction-card/transaction-card.component';
import { AddTagModalComponent } from '../../components/add-tag-modal/add-tag-modal.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, TransactionCardComponent, AddTagModalComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  mockTransactions: Transaction[] = [
    {
      transactionName: 'Grocery Shopping',
      amount: 150.75,
      dateCreated: new Date('2024-03-25T10:30:00Z'),
      tags: [
        {
          tagId: '8b2fefcf-524d-4a05-91e2-98eca2494ae8',
          tagName: 'Food',
          color: 'red',
        },
        {
          tagId: '10442c98-b63e-4617-bd52-6fe6299122fd',
          tagName: 'Essentials',
          color: 'orange',
        },
      ],
    },
    {
      transactionName: 'Electric Bill',
      amount: 90.25,
      dateCreated: new Date('2024-03-20T08:15:00Z'),
      tags: [
        {
          tagId: '55f592e3-1a77-4d7d-beca-6077a1f9c79e',
          tagName: 'Utilities',
          color: 'yellow',
        },
      ],
    },
    {
      transactionName: 'Dinner Out',
      amount: 60.0,
      dateCreated: new Date('2024-03-22T19:45:00Z'),
      tags: [
        {
          tagId: 'b0f8eae0-ec28-433a-9dbe-f8f6e64ed4bd',
          tagName: 'Entertainment',
          color: 'green',
        },
        {
          tagId: 'c6dd2b34-f991-4d3c-a2ae-b211c275a633',
          tagName: 'Food',
          color: 'blue',
        },
      ],
    },
    {
      transactionName: 'Gas Refill',
      amount: 45.0,
      dateCreated: new Date('2024-03-18T14:30:00Z'),
      tags: [
        {
          tagId: '0eef4293-d958-4cc2-b213-913bbcfe5d4f',
          tagName: 'Transportation',
          color: 'indigo',
        },
      ],
    },
    {
      transactionName: 'Gym Membership',
      amount: 30.0,
      dateCreated: new Date('2024-03-15T07:00:00Z'),
      tags: [
        {
          tagId: '7be4efce-e20f-46cf-a5f6-ecf9d2c81dbe',
          tagName: 'Health',
          color: 'violet',
        },
      ],
    },
    {
      transactionName: 'Movie Night',
      amount: 25.0,
      dateCreated: new Date('2024-03-14T20:00:00Z'),
      tags: [
        {
          tagId: '52aa0107-91a3-496b-8863-eac359c15037',
          tagName: 'Entertainment',
          color: 'pink',
        },
      ],
    },
    {
      transactionName: 'Online Shopping',
      amount: 120.5,
      dateCreated: new Date('2024-03-10T15:25:00Z'),
      tags: [
        {
          tagId: 'a7dd49e2-614d-4741-8051-221288d35530',
          tagName: 'Retail',
          color: 'blue',
        },
      ],
    },
    {
      transactionName: 'Car Repair',
      amount: 300.0,
      dateCreated: new Date('2024-03-08T09:45:00Z'),
      tags: [
        {
          tagId: '2cbe613b-0b92-482e-b586-0a75fdd6c8f1',
          tagName: 'Maintenance',
          color: 'blue',
        },
      ],
    },
    {
      transactionName: 'Rent Payment',
      amount: 1200.0,
      dateCreated: new Date('2024-03-01T12:00:00Z'),
      tags: [
        {
          tagId: '55f592e3-1a77-4d7d-beca-6077a1f9c79e',
          tagName: 'Utilities',
          color: 'yellow',
        },
        {
          tagId: '10442c98-b63e-4617-bd52-6fe6299122fd',
          tagName: 'Essentials',
          color: 'orange',
        },
      ],
    },
    {
      transactionName: 'Concert Ticket',
      amount: 75.0,
      dateCreated: new Date('2024-02-28T18:30:00Z'),
      tags: [
        {
          tagId: 'b0f8eae0-ec28-433a-9dbe-f8f6e64ed4bd',
          tagName: 'Entertainment',
          color: 'green',
        },
      ],
    },
  ];

  transactionSelected = signal<Transaction>({
    transactionName: '',
    amount: 0,
    dateCreated: new Date(),
    tags: [],
  });
  showModal = signal(false);

  addTagClicked(transaction: Transaction) {
    this.transactionSelected.set(transaction);
    this.showModal.set(true);
  }

  closeModalClicked() {
    this.showModal.set(false);
  }
}
