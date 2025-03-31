import {
  Component,
  effect,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionCardComponent } from '../../components/transaction-card/transaction-card.component';
import { AddTagModalComponent } from '../../components/add-tag-modal/add-tag-modal.component';
import { select, Store } from '@ngrx/store';
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
import { mockTags } from '../../store/tags/tags.reducers';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, TransactionCardComponent, AddTagModalComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  transactionSelected = signal<Transaction>({
    id: '',
    name: '',
    amount: 0,
    dateCreated: new Date(),
    tags: [],
  });

  showModal = signal(false);
  transactions = signal<Transaction[]>([]);
  storeInitialized = false;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(selectTaglessTransasctions)
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

  addTagClicked(transaction: Transaction) {
    this.transactionSelected.set(transaction);
    this.showModal.set(true);
  }

  closeModalClicked() {
    this.showModal.set(false);
  }
}
