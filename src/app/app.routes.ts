import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DomainsComponent } from './pages/domains/domains.component';
import { ProfessionalListComponent } from './pages/professional-list/professional-list.component';
import { ProfessionalDetailComponent } from './pages/professional-detail/professional-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'domains', component: DomainsComponent },
  { path: 'professionals/:domain', component: ProfessionalListComponent },
  { path: 'professional/:domain/:id', component: ProfessionalDetailComponent },
  { path: '**', redirectTo: '' }
];
