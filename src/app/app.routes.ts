import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DomainsComponent } from './pages/domains/domains.component';
import { ProfessionalListComponent } from './pages/professional-list/professional-list.component';
import { ProfessionalDetailComponent } from './pages/professional-detail/professional-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'domains', component: DomainsComponent, canActivate: [AuthGuard] },
  { path: 'professionals/:domain', component: ProfessionalListComponent, canActivate: [AuthGuard] },
  { path: 'professional/:domain/:id', component: ProfessionalDetailComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

