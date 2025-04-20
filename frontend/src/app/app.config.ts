import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { transactionsReducer } from './store/transactions/transactions.reducers';
import { provideEffects } from '@ngrx/effects';
import { TagEffects } from './store/tags/tags.effects';
import { tagsReducer } from './store/tags/tags.reducers';
import { provideHttpClient } from '@angular/common/http';
import { colorOptionsReducer } from './store/colorOptions/colorOptions.reducers';
import { TransactionEffects } from './store/transactions/transactions.effects';
import { ColorOptionsEffects } from './store/colorOptions/colorOptions.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({
      transactions: transactionsReducer,
      tags: tagsReducer,
      colorOptions: colorOptionsReducer,
    }),
    provideEffects([TagEffects, TransactionEffects, ColorOptionsEffects]),
    provideHttpClient(),
  ],
};
