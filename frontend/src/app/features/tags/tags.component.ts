import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Tag } from '../../models/models';

export const mockTags: Tag[] = [
  {
    tagId: '8b2fefcf-524d-4a05-91e2-98eca2494ae8',
    tagName: 'Food',
    color: 'red',
  },
  {
    tagId: '10442c98-b63e-4617-bd52-6fe6299122fd',
    tagName: 'Essentials',
    color: 'orange',
  },
  {
    tagId: '55f592e3-1a77-4d7d-beca-6077a1f9c79e',
    tagName: 'Utilities',
    color: 'yellow',
  },
  {
    tagId: 'b0f8eae0-ec28-433a-9dbe-f8f6e64ed4bd',
    tagName: 'Entertainment',
    color: 'green',
  },
  {
    tagId: 'c6dd2b34-f991-4d3c-a2ae-b211c275a633',
    tagName: 'Food',
    color: 'blue',
  },
  {
    tagId: '0eef4293-d958-4cc2-b213-913bbcfe5d4f',
    tagName: 'Transportation',
    color: 'indigo',
  },
  {
    tagId: '7be4efce-e20f-46cf-a5f6-ecf9d2c81dbe',
    tagName: 'Health',
    color: 'violet',
  },
  {
    tagId: '52aa0107-91a3-496b-8863-eac359c15037',
    tagName: 'Entertainment',
    color: 'pink',
  },
  {
    tagId: 'a7dd49e2-614d-4741-8051-221288d35530',
    tagName: 'Retail',
    color: 'blue',
  },
  {
    tagId: '2cbe613b-0b92-482e-b586-0a75fdd6c8f1',
    tagName: 'Maintenance',
    color: 'blue',
  },
];

@Component({
  selector: 'app-tags',
  imports: [CommonModule],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss',
})
export class TagsComponent {}
