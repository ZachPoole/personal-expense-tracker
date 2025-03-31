import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transaction } from '../../store/transactions/transactions.model';
import { TagsManagementComponent } from '../../features/tags/tagsManagement.component';
import { TagComponent } from '../tag/tag.component';

@Component({
  selector: 'app-transaction-card',
  imports: [CommonModule, TagComponent],
  templateUrl: './transaction-card.component.html',
  styleUrl: './transaction-card.component.scss',
})
export class TransactionCardComponent {
  transaction = input.required<Transaction>();
  showButton = input(true);
  inModal = computed(() => !this.showButton());
  addTagClicked = output<Transaction>();

  handleAddTagClicked() {
    this.addTagClicked.emit(this.transaction());
  }
}
