import { Component, input, model, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tag } from '../../store/tags/tags.model';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { TagsActions } from '../../store/tags/tags.actions';

@Component({
  selector: 'app-tag',
  imports: [CommonModule, MatIconModule],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss',
})
export class TagComponent {
  tag = input.required<Tag>();
  selectable = input<boolean>(false);
  tagSelected = output<Tag>();
  disabled = input<boolean>(false);
  allowDelete = input<boolean>(false);

  constructor(private store: Store) {}

  getBackgroundColor() {
    let color = 'var($red-pastel)';
    return color;
  }

  handleTagSelected() {
    if (this.selectable() && !this.disabled()) {
      this.tagSelected.emit(this.tag());
    }
  }

  handleDeleteClicked() {
    this.store.dispatch(TagsActions.tagDeleted({ tagId: this.tag().id }));
  }
}
