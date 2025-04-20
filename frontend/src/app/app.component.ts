import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { Store } from '@ngrx/store';
import { TransactionsApi } from './api/transactions.api';
import { TagsApi } from './api/tags.api';
import { ColorOptionsApi } from './api/colorOptions.api';
import { TransactionsActions } from './store/transactions/transactions.actions';
import { TagsActions } from './store/tags/tags.actions';
import { ColorOptionsActions } from './store/colorOptions/colorOptions.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  store = inject(Store);

  transactionsApi = inject(TransactionsApi);
  tagsApi = inject(TagsApi);
  colorOptionsApi = inject(ColorOptionsApi);

  title = 'personal-expense-tracker-frontend';

  ngOnInit(): void {
    this.store.dispatch(TransactionsActions.appLoaded());
    this.store.dispatch(TagsActions.appLoaded());
    this.store.dispatch(ColorOptionsActions.appLoaded());
  }
}
