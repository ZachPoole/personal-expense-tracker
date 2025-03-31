import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectTags } from '../../store/tags/tags.selectors';
import { TagsActions } from '../../store/tags/tags.actions';
import { tagsInitialState } from '../../store/tags/tags.reducers';
import { TagComponent } from '../../components/tag/tag.component';
import { Tag } from '../../store/tags/tags.model';

@Component({
  selector: 'app-tags',
  imports: [CommonModule, TagComponent],
  templateUrl: './tagsManagement.component.html',
  styleUrl: './tagsManagement.component.scss',
})
export class TagsManagementComponent implements OnInit {
  tags = signal<Tag[]>([]);
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(selectTags).subscribe((tags) => this.tags.set(tags));

    if (this.tags().length === 0) {
      this.store.dispatch(
        TagsActions.tagsRetreived({ tags: tagsInitialState })
      );
    }
  }
}
