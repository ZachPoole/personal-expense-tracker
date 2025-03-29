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
    },
    {
      transactionName: 'Electric Bill',
      amount: 90.25,
      dateCreated: new Date('2024-03-20T08:15:00Z'),
    },
    {
      transactionName: 'Dinner Out',
      amount: 60.0,
      dateCreated: new Date('2024-03-22T19:45:00Z'),
    },
    {
      transactionName: 'Gas Refill',
      amount: 45.0,
      dateCreated: new Date('2024-03-18T14:30:00Z'),
    },
    {
      transactionName: 'Gym Membership',
      amount: 30.0,
      dateCreated: new Date('2024-03-15T07:00:00Z'),
    },
    {
      transactionName: 'Movie Night',
      amount: 25.0,
      dateCreated: new Date('2024-03-14T20:00:00Z'),
    },
    {
      transactionName: 'Online Shopping',
      amount: 120.5,
      dateCreated: new Date('2024-03-10T15:25:00Z'),
    },
    {
      transactionName: 'Car Repair',
      amount: 300.0,
      dateCreated: new Date('2024-03-08T09:45:00Z'),
    },
    {
      transactionName: 'Rent Payment',
      amount: 1200.0,
      dateCreated: new Date('2024-03-01T12:00:00Z'),
    },
    {
      transactionName: 'Concert Ticket',
      amount: 75.0,
      dateCreated: new Date('2024-02-28T18:30:00Z'),
    },
  ];

  transactionSelected = signal<Transaction>({
    transactionName: '',
    amount: 0,
    dateCreated: new Date(),
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
