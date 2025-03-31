import {
  Component,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { TransactionCardComponent } from '../transaction-card/transaction-card.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TagComponent } from '../tag/tag.component';
import { Transaction } from '../../store/transactions/transactions.model';
import { tagsInitialState, mockTags } from '../../store/tags/tags.reducers';
import { select, Store } from '@ngrx/store';
import { selectTagsStoreState } from '../../store/tags/tags.selectors';
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
  store = inject(Store);

  tags = signal<TagSelected[]>([]);
  storeInitialized = false;

  transactionSelected = input.required<Transaction>();
  closeModalClicked = output();

  ngOnInit(): void {
    this.store
      .select(selectTagsStoreState)
      .pipe(
        map((tagsStoreState) => {
          this.storeInitialized = tagsStoreState.initialized;
          return tagsStoreState.tags.map((tag) => ({
            ...tag,
            selected: false,
          }));
        })
      )
      .subscribe((tagsWithSelectionArray: TagSelected[]) =>
        this.tags.set(tagsWithSelectionArray)
      );

    if (!this.storeInitialized) {
      this.store.dispatch(TagsActions.seedTagState({ tags: mockTags }));
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
