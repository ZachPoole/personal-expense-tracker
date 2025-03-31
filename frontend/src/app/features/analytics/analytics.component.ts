import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
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
import { Tag } from '../../store/tags/tags.model';

@Component({
  selector: 'app-analytics',
  imports: [CommonModule, TransactionCardComponent],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss',
})
export class AnalyticsComponent implements OnInit {
  store = inject(Store);

  transactions = signal<Transaction[]>([]);
  tags = signal<Tag[]>([]);

  transactionStoreInitialized = false;
  tagStoreInitialized = false;

  ngOnInit(): void {
    this.store
      .select(selectTransactionsStoreState)
      .subscribe((transactionsStoreState) => {
        this.transactions.set(transactionsStoreState.transactions);
        this.transactionStoreInitialized = transactionsStoreState.initialized;
      });

    if (!this.transactionStoreInitialized) {
      this.store.dispatch(
        TransactionsActions.seedTransactionState({
          transactions: mockTransactions,
        })
      );
    }
  }
}
