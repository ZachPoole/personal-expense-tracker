import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectTags } from '../../store/tags/tags.selectors';
import { TagsActions } from '../../store/tags/tags.actions';
import { initialState } from '../../store/tags/tags.reducers';
import { TagComponent } from '../../components/tag/tag.component';

@Component({
  selector: 'app-tags',
  imports: [CommonModule, TagComponent],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss',
})
export class TagsComponent implements OnInit {
  tags$: any;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.tags$ = this.store.select(selectTags);

    this.store.dispatch(TagsActions.tagsRetreived({ tags: initialState }));
  }
}
