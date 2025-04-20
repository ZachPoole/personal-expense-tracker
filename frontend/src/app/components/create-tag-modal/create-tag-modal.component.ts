import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  model,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { TagsActions } from '../../store/tags/tags.actions';
import { Tag } from '../../store/tags/tags.model';
import { v4 as uuidv4 } from 'uuid';
import { TagComponent } from '../tag/tag.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { colorOptionsInitialState } from '../../store/colorOptions/colorOptions.reducers';
import { selectColorOptionsStoreState } from '../../store/colorOptions/colorOptions.selectors';
import { ColorOption } from '../../store/colorOptions/colorOptions.model';
import { ColorOptionsApi } from '../../api/colorOptions.api';
import { ColorOptionsApiActions } from '../../store/colorOptions/colorOptions.actions';

@Component({
  selector: 'app-create-tag-modal',
  imports: [CommonModule, MatIconModule, TagComponent, ReactiveFormsModule],
  templateUrl: './create-tag-modal.component.html',
  styleUrl: './create-tag-modal.component.scss',
})
export class CreateTagModalComponent implements OnInit {
  store = inject(Store);
  colorOptionsApi = inject(ColorOptionsApi);

  colorOptions = signal<ReadonlyArray<ColorOption>>([]);
  closeModalClicked = output();

  newTag = model<Tag>({
    id: uuidv4(),
    name: 'Placeholder',
    color: { id: '', color: 'Red', order: 1 },
  });

  tagForm = new FormGroup({
    id: new FormControl(uuidv4()),
    name: new FormControl('Placeholder'),
    color: new FormControl({ id: '', color: 'red', order: 1 }),
  });

  ngOnInit(): void {
    this.store
      .select(selectColorOptionsStoreState)
      .subscribe((colorOptionsStoreState) => {
        this.colorOptions.set(colorOptionsStoreState.colorOptions);

        this.tagForm.setControl(
          'color',
          new FormControl(this.colorOptions()[0])
        );

        this.newTag.set({ ...this.newTag(), color: this.colorOptions()[0] });
      });

    this.tagForm.valueChanges.subscribe((newValue) => {
      this.newTag.set({
        id: newValue.id!,
        name: newValue.name!,
        color: newValue.color!,
      });
    });
  }

  closeClicked() {
    this.closeModalClicked.emit();
  }

  handleCreateClicked() {
    if (this.newTag().name.trim() !== '') {
      this.store.dispatch(TagsActions.tagCreated({ tag: this.newTag() }));
      this.closeModalClicked.emit();
    }
  }

  handleCancelClicked() {
    this.closeModalClicked.emit();
  }
}
