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
  selectTransactions,
} from '../../store/transactions/transactions.selectors';
import { TransactionsActions } from '../../store/transactions/transactions.actions';
import { transactionsInitialState } from '../../store/transactions/transactions.reducers';

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

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(selectTaglessTransasctions)
      .subscribe((transactions) => this.transactions.set(transactions));

    if (this.transactions.length === 0) {
      this.store.dispatch(
        TransactionsActions.transactionsRetreived({
          transactions: transactionsInitialState,
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
