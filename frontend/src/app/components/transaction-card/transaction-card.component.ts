import { Component, input } from '@angular/core';
import { Transaction } from '../../models/models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-card.component.html',
  styleUrl: './transaction-card.component.scss'
})
export class TransactionCardComponent {
  transaction = input.required<Transaction>();
  showButton = input<boolean>(true);
}
