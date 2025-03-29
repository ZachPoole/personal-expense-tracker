import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Tag } from '../../models/models';

@Component({
    selector: 'app-tags',
    imports: [CommonModule],
    templateUrl: './tags.component.html',
    styleUrl: './tags.component.scss'
})
export class TagsComponent {

mockTags: Tag[] = [
  { transactionName: "Grocery Shopping", tagName: "Food", color: "red" },
  { transactionName: "Grocery Shopping", tagName: "Essentials", color: "green" },
  { transactionName: "Electric Bill", tagName: "Utilities", color: "blue" },
  { transactionName: "Dinner Out", tagName: "Entertainment", color: "pink" },
  { transactionName: "Dinner Out", tagName: "Food", color: "yellow" },
  { transactionName: "Gas Refill", tagName: "Transportation", color: "purple" },
  { transactionName: "Gym Membership", tagName: "Health", color: "cyan" },
  { transactionName: "Movie Night", tagName: "Entertainment", color: "orange" },
  { transactionName: "Online Shopping", tagName: "Retail", color: "lime" },
  { transactionName: "Car Repair", tagName: "Maintenance", color: "violet" }
]

}
