import { Component, Input, input, OnChanges, OnInit, output, SimpleChange, SimpleChanges } from '@angular/core';
import { Transaction } from '../../models/models';
import { TransactionCardComponent } from '../transaction-card/transaction-card.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-add-tag-modal',
    imports: [CommonModule, TransactionCardComponent],
    templateUrl: './add-tag-modal.component.html',
    styleUrl: './add-tag-modal.component.scss'
})
export class AddTagModalComponent implements OnChanges  {

  test: Transaction = {
    transactionName: "test",
    amount: 30,
    dateCreated: new Date()
  }

  transactionSelected = input.required<Transaction>();
  closeModalClicked = output<void>();

  ngOnChanges(changes: SimpleChanges) {
    console.log( "add-tag", changes)
    this.test = this.transactionSelected()
  }


  closeClicked() {
    this.closeModalClicked.emit();
  }
}
