import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Tag } from '../../store/tags/tags.model';

@Component({
  selector: 'app-tags',
  imports: [CommonModule],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss',
})
export class TagsComponent {}
