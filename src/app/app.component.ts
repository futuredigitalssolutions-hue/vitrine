import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'vitrine-app';
  isDetailPage = false;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Vérifier si on est côté navigateur avant d'accéder aux événements du router
    if (isPlatformBrowser(this.platformId)) {
      // Écouter les changements de route pour masquer/afficher la navbar
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: any) => {
        // Masquer la navbar si on est sur une page de détail professionnel
        this.isDetailPage = event.url.includes('/professional/');
      });
    }
  }
}
