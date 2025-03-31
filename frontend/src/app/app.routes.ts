import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { TagsManagementComponent } from './features/tags/tagsManagement.component';
import { AnalyticsComponent } from './features/analytics/analytics.component';
import { SettingsComponent } from './features/settings/settings.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tags', component: TagsManagementComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: '**', redirectTo: 'dashboard' },
  // { path: 'settings', component: SettingsComponent },
];
