import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionCardComponent } from '../../components/transaction-card/transaction-card.component';
import { AddTagModalComponent } from '../../components/add-tag-modal/add-tag-modal.component';
import { Store } from '@ngrx/store';
import { Transaction } from '../../store/transactions/transactions.model';
import {
  TransactionsActions,
  TransactionsApiActions,
} from '../../store/transactions/transactions.actions';
import { TransactionsApi } from '../../api/transactions.api';
import { selectTransactionsStoreState } from '../../store/transactions/transactions.selectors';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, TransactionCardComponent, AddTagModalComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  store = inject(Store);
  transactionsApi = inject(TransactionsApi);

  transactions = signal<ReadonlyArray<Transaction>>([]);
  transactionSelected = signal<Transaction | null>(null);
  showModal = signal(false);

  ngOnInit(): void {
    this.store
      .select(selectTransactionsStoreState)
      .subscribe((transactionsStoreState) => {
        this.transactions.set(transactionsStoreState.transactions);
      });

    this.store.dispatch(TransactionsActions.dashboardComponentLoaded());
  }

  addTagClicked(transaction: Transaction) {
    this.transactionSelected.set(transaction);
    this.showModal.set(true);
  }

  closeModalClicked() {
    this.showModal.set(false);
  }
}
