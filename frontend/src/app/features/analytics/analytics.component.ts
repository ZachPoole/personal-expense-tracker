import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { TransactionCardComponent } from '../../components/transaction-card/transaction-card.component';
import { Store } from '@ngrx/store';
import { Transaction } from '../../store/transactions/transactions.model';
import {
  selectTaglessTransasctions,
  selectTransactions,
} from '../../store/transactions/transactions.selectors';
import { TransactionsActions } from '../../store/transactions/transactions.actions';
import { transactionsInitialState } from '../../store/transactions/transactions.reducers';

@Component({
  selector: 'app-analytics',
  imports: [CommonModule, TransactionCardComponent],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss',
})
export class AnalyticsComponent {
  transactions = signal<Transaction[]>([]);
  storeInitialized = false;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(selectTransactions).subscribe((transactions) => {
      this.transactions.set(transactions);
      this.storeInitialized = true;
    });

    if (!this.storeInitialized) {
      this.store.dispatch(
        TransactionsActions.transactionsRetreived({
          transactions: transactionsInitialState,
        })
      );
    }
  }
}
