import { Component, input, model, output, signal } from '@angular/core';
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
  clickable = input<boolean>(false);
  tagClicked = output<Tag>();
  disabled = input<boolean>(false);

  getBackgroundColor() {
    let color = 'var($red-pastel)';
    return color;
  }

  handleTagClicked() {
    if (this.clickable() && !this.disabled()) {
      this.tagClicked.emit(this.tag());
    }
  }
}
