import { Component, Input, input, OnChanges, OnInit, output, SimpleChange, SimpleChanges } from '@angular/core';
import { Transaction } from '../../models/models';
import { CommonModule } from '@angular/common';
import { AddTagModalComponent } from '../add-tag-modal/add-tag-modal.component';

@Component({
    selector: 'app-transaction-card',
    imports: [CommonModule, AddTagModalComponent],
    templateUrl: './transaction-card.component.html',
    styleUrl: './transaction-card.component.scss'
})
export class TransactionCardComponent implements OnChanges {
  test: Transaction = {
    transactionName: "test",
    amount: 30,
    dateCreated: new Date()
  }
  transaction = input.required<Transaction>();
  showButton = input(true);

  showModal = false;

  

  ngOnChanges(changes: SimpleChanges) {
    console.log("transaction-card", changes)
    this.test = this.transaction()
  }

  addTagClicked() {
    this.showModal = true;
  }

  closeModalClicked() {
    this.showModal = false;
  }



}
