import { Component, input } from '@angular/core';
import { Tag } from '../../models/models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tag',
  imports: [CommonModule],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss',
})
export class TagComponent {
  tag = input.required<Tag>();

  getBackgroundColor() {
    let color = 'var($red-pastel)';
    return color;
  }
}
