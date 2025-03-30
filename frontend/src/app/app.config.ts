import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { transactionsReducer } from './store/transactions/transactions.reducers';
import { provideEffects } from '@ngrx/effects';
import { TagEffects } from './store/tags/tags.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ transactions: transactionsReducer }),
    provideEffects([TagEffects]),
  ],
};
