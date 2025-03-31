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
import { Tag, TagWithSelection } from '../../store/tags/tags.model';
import { selectTagsStoreState } from '../../store/tags/tags.selectors';
import { TagsActions } from '../../store/tags/tags.actions';
import { mockTags } from '../../store/tags/tags.reducers';
import { TagComponent } from '../../components/tag/tag.component';
import { map } from 'rxjs';

@Component({
  selector: 'app-analytics',
  imports: [CommonModule, TransactionCardComponent, TagComponent],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss',
})
export class AnalyticsComponent implements OnInit {
  store = inject(Store);

  transactions = signal<Transaction[]>([]);
  filteredTransactions = signal<Transaction[]>([]);
  tags = signal<TagWithSelection[]>([]);
  selectedTags = new Set<string>();

  total = signal<number>(0);

  transactionStoreInitialized = false;
  tagStoreInitialized = false;

  ngOnInit(): void {
    this.store
      .select(selectTransactionsStoreState)
      .subscribe((transactionsStoreState) => {
        this.transactions.set(transactionsStoreState.transactions);
        this.filteredTransactions.set(transactionsStoreState.transactions);
        this.transactionStoreInitialized = transactionsStoreState.initialized;
        this.updateTotal();
      });

    this.store
      .select(selectTagsStoreState)
      .pipe(
        map((tagsStoreState) => {
          this.tagStoreInitialized = tagsStoreState.initialized;
          return tagsStoreState.tags.map((tag) => ({
            ...tag,
            selected: false,
          }));
        })
      )
      .subscribe((tagsWithSelectionArray: TagWithSelection[]) =>
        this.tags.set(tagsWithSelectionArray)
      );

    if (!this.transactionStoreInitialized) {
      this.store.dispatch(
        TransactionsActions.seedTransactionState({
          transactions: mockTransactions,
        })
      );
    }

    if (!this.tagStoreInitialized) {
      this.store.dispatch(
        TagsActions.seedTagState({
          tags: mockTags,
        })
      );
    }
  }

  handleTagSelected(selectedTag: TagWithSelection) {
    if (selectedTag.selected) {
      this.selectedTags.add(selectedTag.id);
    } else {
      this.selectedTags.delete(selectedTag.id);
    }

    this.tags.update((tagsArray: TagWithSelection[]) =>
      tagsArray.map((tag) => {
        if (tag.id === selectedTag.id) {
          return { ...tag, selected: selectedTag.selected };
        } else {
          return tag;
        }
      })
    );

    this.updateFilteredTransactions();
  }

  private updateFilteredTransactions() {
    if (this.selectedTags.size === 0) {
      this.filteredTransactions.set(this.transactions());
    } else {
      this.filteredTransactions.set(
        this.transactions().filter(
          (transaction: Transaction) =>
            transaction.tags.findIndex((tag) =>
              this.selectedTags.has(tag.id)
            ) !== -1
        )
      );
    }

    this.updateTotal();
  }

  private updateTotal() {
    let sum = 0;
    this.filteredTransactions().forEach((transaction) => {
      sum += transaction.amount;
    });

    this.total.set(sum);
  }
}
