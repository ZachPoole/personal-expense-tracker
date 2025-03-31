import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { TransactionCardComponent } from '../../components/transaction-card/transaction-card.component';
import { Store } from '@ngrx/store';
import { Transaction } from '../../store/transactions/transactions.model';
import {
  selectTaglessTransasctions,
  selectTransactionsStoreState,
} from '../../store/transactions/transactions.selectors';
import { TransactionsActions } from '../../store/transactions/transactions.actions';
import {
  mockTransactions,
  transactionsInitialState,
} from '../../store/transactions/transactions.reducers';

@Component({
  selector: 'app-analytics',
  imports: [CommonModule, TransactionCardComponent],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss',
})
export class AnalyticsComponent implements OnInit {
  transactions = signal<Transaction[]>([]);
  storeInitialized = false;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(selectTransactionsStoreState)
      .subscribe((transactionsStoreState) => {
        this.transactions.set(transactionsStoreState.transactions);
        this.storeInitialized = transactionsStoreState.initialized;
      });

    if (!this.storeInitialized) {
      this.store.dispatch(
        TransactionsActions.seedTransactionState({
          transactions: mockTransactions,
        })
      );
    }
  }
}
