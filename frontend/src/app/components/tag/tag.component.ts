import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tag } from '../../store/tags/tags.model';

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
