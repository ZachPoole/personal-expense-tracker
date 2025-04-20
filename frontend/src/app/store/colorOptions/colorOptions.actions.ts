import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ColorOption } from './colorOptions.model';

export const ColorOptionsActions = createActionGroup({
  source: 'ColorOptions',
  events: {
    'App Loaded': emptyProps(),
  },
});

export const ColorOptionsApiActions = createActionGroup({
  source: 'ColorOptions API',
  events: {
    'Retreived ColorOptions': props<{
      colorOptions: ReadonlyArray<ColorOption>;
    }>(),
  },
});
