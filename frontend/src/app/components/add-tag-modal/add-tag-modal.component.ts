import { Component, input, output, signal } from '@angular/core';
import { TransactionCardComponent } from '../transaction-card/transaction-card.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TagComponent } from '../tag/tag.component';
import { Transaction } from '../../store/transactions/transactions.model';
import { mockTags } from '../../store/tags/tags.reducers';

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
export class AddTagModalComponent {
  tags = signal(mockTags);

  transactionSelected = input.required<Transaction>();
  closeModalClicked = output();

  closeClicked() {
    this.closeModalClicked.emit();
  }
}
