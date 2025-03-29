import { Component, input, output, signal } from '@angular/core';
import { Transaction } from '../../models/models';
import { TransactionCardComponent } from '../transaction-card/transaction-card.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { mockTags } from '../../features/tags/tags.component';
import { TagComponent } from '../tag/tag.component';

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
