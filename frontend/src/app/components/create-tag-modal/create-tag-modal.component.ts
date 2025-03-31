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

@Component({
  selector: 'app-create-tag-modal',
  imports: [CommonModule, MatIconModule, TagComponent, ReactiveFormsModule],
  templateUrl: './create-tag-modal.component.html',
  styleUrl: './create-tag-modal.component.scss',
})
export class CreateTagModalComponent implements OnInit {
  store = inject(Store);

  colorOptions: string[] = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'indigo',
    'violet',
    'pink',
  ];

  closeModalClicked = output();

  newTag = model<Tag>({
    id: uuidv4(),
    name: 'Placeholder',
    color: 'red',
  });

  tagForm = new FormGroup({
    id: new FormControl(uuidv4()),
    name: new FormControl(''),
    color: new FormControl('red'),
  });

  ngOnInit(): void {
    this.tagForm.setControl('color', new FormControl(this.colorOptions[0]));
    this.tagForm.valueChanges.subscribe((newValue) => {
      console.log(newValue.color);
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
    console.log(this.tagForm.value);
    if (this.newTag().name.trim() !== '') {
      this.store.dispatch(TagsActions.tagCreated({ tag: this.newTag() }));
      this.closeModalClicked.emit();
    }
  }

  handleCancelClicked() {
    this.closeModalClicked.emit();
  }
}
