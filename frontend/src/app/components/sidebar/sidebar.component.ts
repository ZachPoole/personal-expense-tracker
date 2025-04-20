import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { TransactionsActions } from '../../store/transactions/transactions.actions';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  store = inject(Store);
  router = inject(Router);

  handleResetClicked() {
    this.store.dispatch(TransactionsActions.resetMockData());
    this.router.navigate(['/']);
  }
}
