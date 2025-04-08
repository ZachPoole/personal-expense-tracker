import { createActionGroup, props } from '@ngrx/store';
import { ColorOption } from './colorOptions.model';

export const ColorOptionsApiActions = createActionGroup({
  source: 'ColorOptions API',
  events: {
    'Retreived ColorOptions': props<{
      colorOptions: ReadonlyArray<ColorOption>;
    }>(),
  },
});
