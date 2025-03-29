import { Component, input, output } from '@angular/core';
import { Transaction } from '../../models/models';
import { TransactionCardComponent } from '../transaction-card/transaction-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-tag-modal',
  imports: [CommonModule, TransactionCardComponent],
  templateUrl: './add-tag-modal.component.html',
  styleUrl: './add-tag-modal.component.scss',
})
export class AddTagModalComponent {
  transactionSelected = input.required<Transaction>();
  closeModalClicked = output();

  closeClicked() {
    this.closeModalClicked.emit();
  }
}
