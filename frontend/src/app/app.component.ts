import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { Store } from '@ngrx/store';
import { TransactionsApi } from './api/transactions.api';
import { TagsApi } from './api/tags.api';
import { ColorOptionsApi } from './api/colorOptions.api';
import { TransactionsApiActions } from './store/transactions/transactions.actions';
import { TagsApiActions } from './store/tags/tags.actions';
import { ColorOptionsApiActions } from './store/colorOptions/colorOptions.actions';

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
    this.transactionsApi
      .getTaglessTransactions()
      .subscribe((taglessTransactions) =>
        this.store.dispatch(
          TransactionsApiActions.retrievedTaglessTransactions({
            transactions: taglessTransactions,
          })
        )
      );

    this.tagsApi
      .getTags()
      .subscribe((tags) =>
        this.store.dispatch(TagsApiActions.retreivedTags({ tags }))
      );

    this.colorOptionsApi
      .getColorOptions()
      .subscribe((colorOptions) =>
        this.store.dispatch(
          ColorOptionsApiActions.retreivedColorOptions({ colorOptions })
        )
      );
  }
}
