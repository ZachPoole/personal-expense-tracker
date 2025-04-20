import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { TransactionCardComponent } from '../../components/transaction-card/transaction-card.component';
import { Store } from '@ngrx/store';
import { Transaction } from '../../store/transactions/transactions.model';
import { selectTransactionsStoreState } from '../../store/transactions/transactions.selectors';
import {
  TransactionsActions,
  TransactionsApiActions,
} from '../../store/transactions/transactions.actions';
import { transactionsInitialState } from '../../store/transactions/transactions.reducers';
import { Tag, TagWithSelection } from '../../store/tags/tags.model';
import { selectTagsStoreState } from '../../store/tags/tags.selectors';
import { TagsActions, TagsApiActions } from '../../store/tags/tags.actions';
import { TagComponent } from '../../components/tag/tag.component';
import { map } from 'rxjs';
import { TransactionsApi } from '../../api/transactions.api';
import { TagsApi } from '../../api/tags.api';

@Component({
  selector: 'app-analytics',
  imports: [CommonModule, TransactionCardComponent, TagComponent],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss',
})
export class AnalyticsComponent implements OnInit {
  store = inject(Store);
  transactionsApi = inject(TransactionsApi);
  tagsApi = inject(TagsApi);

  transactions = signal<ReadonlyArray<Transaction>>([]);
  tags = signal<TagWithSelection[]>([]);
  selectedTags = new Set<string>();

  total = signal<number>(0);

  tagStoreInitialized = false;

  ngOnInit(): void {
    this.store
      .select(selectTransactionsStoreState)
      .subscribe((transactionsStoreState) => {
        this.transactions.set(transactionsStoreState.transactions);
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

    this.store.dispatch(TransactionsActions.analyticsComponentLoaded());
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
  }

  private updateTotal() {
    let sum = 0;
    this.transactions().forEach((transaction) => {
      sum += transaction.amount;
    });

    this.total.set(sum);
  }
}
