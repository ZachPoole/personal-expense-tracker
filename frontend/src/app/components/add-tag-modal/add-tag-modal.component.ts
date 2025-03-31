import { Component, input, OnInit, output, signal } from '@angular/core';
import { TransactionCardComponent } from '../transaction-card/transaction-card.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TagComponent } from '../tag/tag.component';
import { Transaction } from '../../store/transactions/transactions.model';
import { initialState, mockTags } from '../../store/tags/tags.reducers';
import { select, Store } from '@ngrx/store';
import { selectTags } from '../../store/tags/tags.selectors';
import { TagsActions } from '../../store/tags/tags.actions';
import { Tag, TagSelected } from '../../store/tags/tags.model';
import { map, Observable } from 'rxjs';
import { TransactionsActions } from '../../store/transactions/transactions.actions';

@Component({
  selector: 'app-add-tag-modal',
  imports: [
    CommonModule,
    TransactionCardComponent,
    MatIconModule,
    TagComponent,
  ],
  standalone: true,
  templateUrl: './add-tag-modal.component.html',
  styleUrl: './add-tag-modal.component.scss',
})
export class AddTagModalComponent implements OnInit {
  tags = signal<TagSelected[]>([]);

  transactionSelected = input.required<Transaction>();
  closeModalClicked = output();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(selectTags)
      .pipe(
        map((tagsArray) => {
          return tagsArray.map((tag) => ({
            ...tag,
            selected: false,
          }));
        })
      )
      .subscribe((tagsWithSelectionArray: TagSelected[]) =>
        this.tags.set(tagsWithSelectionArray)
      );

    if (this.tags().length === 0) {
      this.store.dispatch(TagsActions.tagsRetreived({ tags: initialState }));
    }
  }

  closeClicked() {
    this.closeModalClicked.emit();
  }

  handleTagSelected(selectedTag: Tag) {
    this.tags.update((tagsArray: TagSelected[]) =>
      tagsArray.map((tag) => {
        if (tag.id === selectedTag.id) {
          return { ...tag, selected: true };
        } else {
          return tag;
        }
      })
    );
  }

  handleSaveClicked() {
    this.store.dispatch(
      TransactionsActions.transactionTagsUpdated({
        transactionId: this.transactionSelected().id,
        tags: this.tags().filter((tag) => tag.selected),
      })
    );
    this.closeModalClicked.emit();
  }

  handleCancelClicked() {
    this.closeModalClicked.emit();
  }
}
