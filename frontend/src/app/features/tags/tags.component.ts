import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Tag } from '../../models/models';

@Component({
  selector: 'app-tags',
  imports: [CommonModule],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss',
})
export class TagsComponent {
  mockTags: Tag[] = [
    { transactionName: 'Grocery Shopping', tagName: 'Food', color: 'blue' },
    {
      transactionName: 'Grocery Shopping',
      tagName: 'Essentials',
      color: 'blue',
    },
    { transactionName: 'Electric Bill', tagName: 'Utilities', color: 'blue' },
    { transactionName: 'Dinner Out', tagName: 'Entertainment', color: 'blue' },
    { transactionName: 'Dinner Out', tagName: 'Food', color: 'blue' },
    {
      transactionName: 'Gas Refill',
      tagName: 'Transportation',
      color: 'blue',
    },
    { transactionName: 'Gym Membership', tagName: 'Health', color: 'blue' },
    {
      transactionName: 'Movie Night',
      tagName: 'Entertainment',
      color: 'blue',
    },
    { transactionName: 'Online Shopping', tagName: 'Retail', color: 'blue' },
    { transactionName: 'Car Repair', tagName: 'Maintenance', color: 'blue' },
  ];
}
