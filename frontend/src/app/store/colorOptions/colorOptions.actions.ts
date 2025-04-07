import { createActionGroup, props } from '@ngrx/store';
import { ColorOption } from './colorOptions.model';

export const ColorOptionsActions = createActionGroup({
  source: 'ColorOptions',
  events: {
    'Seed Color Option State': props<{ colorOptions: ColorOption[] }>(),
  },
});
