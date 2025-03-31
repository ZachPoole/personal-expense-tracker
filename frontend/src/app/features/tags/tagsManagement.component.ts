import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectTagsStoreState as selectTagsStoreState } from '../../store/tags/tags.selectors';
import { TagsActions } from '../../store/tags/tags.actions';
import { mockTags, tagsInitialState } from '../../store/tags/tags.reducers';
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
  storeInitialized = false;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(selectTagsStoreState).subscribe((tagsStoreState) => {
      this.storeInitialized = tagsStoreState.initialized;
      this.tags.set(tagsStoreState.tags);
    });

    if (!this.storeInitialized) {
      this.store.dispatch(TagsActions.seedTagState({ tags: mockTags }));
    }
  }
}
