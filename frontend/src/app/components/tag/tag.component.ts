import { Component, inject, input, model, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tag, TagSelected } from '../../store/tags/tags.model';
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
  store = inject(Store);

  tag = input.required<Tag>();
  selectable = input<boolean>(false);
  tagSelected = output<TagSelected>();
  selected = input<boolean>(false);
  allowDelete = input<boolean>(false);

  getBackgroundColor() {
    let color = 'var($red-pastel)';
    return color;
  }

  handleTagSelected() {
    if (this.selectable()) {
      this.tagSelected.emit({ ...this.tag(), selected: !this.selected() });
    }
  }

  handleDeleteClicked() {
    this.store.dispatch(TagsActions.tagDeleted({ tagId: this.tag().id }));
  }
}
