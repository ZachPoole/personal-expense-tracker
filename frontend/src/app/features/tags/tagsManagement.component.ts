import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectTagsStoreState as selectTagsStoreState } from '../../store/tags/tags.selectors';
import { TagsActions, TagsApiActions } from '../../store/tags/tags.actions';
import { TagComponent } from '../../components/tag/tag.component';
import { Tag } from '../../store/tags/tags.model';
import { MatIconModule } from '@angular/material/icon';
import { CreateTagModalComponent } from '../../components/create-tag-modal/create-tag-modal.component';
import { TagsApi } from '../../api/tags.api';

@Component({
  selector: 'app-tags',
  imports: [CommonModule, TagComponent, CreateTagModalComponent],
  templateUrl: './tagsManagement.component.html',
  styleUrl: './tagsManagement.component.scss',
})
export class TagsManagementComponent implements OnInit {
  store = inject(Store);
  tagsApi = inject(TagsApi);

  tags = signal<ReadonlyArray<Tag>>([]);
  storeInitialized = false;
  createTagTag: Tag = {
    id: '',
    name: 'Create Tag',
    color: {
      id: '',
      color: '',
      order: 1,
    },
  };
  showModal = signal(false);

  ngOnInit(): void {
    this.store.select(selectTagsStoreState).subscribe((tagsStoreState) => {
      this.storeInitialized = tagsStoreState.initialized;
      this.tags.set(tagsStoreState.tags);
    });
  }

  handleCreateTagClicked() {
    this.showModal.set(true);
  }

  closeModalClicked() {
    this.showModal.set(false);
  }
}
