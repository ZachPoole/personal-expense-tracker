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

@Component({
  selector: 'app-add-tag-modal',
  imports: [
    CommonModule,
    TransactionCardComponent,
    MatIconModule,
    TagComponent,
  ],
  templateUrl: './add-tag-modal.component.html',
  styleUrl: './add-tag-modal.component.scss',
})
export class AddTagModalComponent implements OnInit {
  tags$: any;

  transactionSelected = input.required<Transaction>();
  closeModalClicked = output();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.tags$ = this.store.select(selectTags);
    this.store.dispatch(TagsActions.tagsRetreived({ tags: initialState }));
  }

  closeClicked() {
    this.closeModalClicked.emit();
  }
}
