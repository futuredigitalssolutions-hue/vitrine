import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-professional-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './professional-detail.component.html',
  styleUrls: ['./professional-detail.component.css']
})
export class ProfessionalDetailComponent implements OnInit, OnDestroy {
  domain: string = '';
  id: string = '';
  htmlContent: SafeHtml = '';

  // Mapping entre les IDs et les fichiers HTML
  private htmlFiles: { [key: string]: string } = {
    'avocat-1': 'avocat1.html',
    'avocat-2': 'avocat2.html',
    'avocat-3': 'avocat3.html',
    'avocat-4': 'avocat4.html',
    'avocat-5': 'avocat5.html',
    'avocat-6': 'avocat6.html',
  };

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    // Ajouter une classe au body seulement côté navigateur
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.add('detail-page');
    }
    
    this.route.params.subscribe(params => {
      this.domain = params['domain'];
      this.id = params['id'];
      this.loadHtmlContent();
    });
  }

  ngOnDestroy() {
    // Supprimer la classe au body seulement côté navigateur
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.remove('detail-page');
    }
  }

  loadHtmlContent() {
    const key = `${this.domain}-${this.id}`;
    const htmlFile = this.htmlFiles[key];
    
    if (htmlFile) {
      // Charger le fichier HTML depuis les assets
      this.http.get(`assets/html/${htmlFile}`, { responseType: 'text' })
        .subscribe({
          next: (content) => {
            this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(content);
          },
          error: (err) => {
            console.error('Erreur lors du chargement du HTML:', err);
            this.htmlContent = this.sanitizer.bypassSecurityTrustHtml('<p>Contenu non disponible</p>');
          }
        });
    } else {
      // Contenu par défaut
      this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(`
        <div style="padding: 4rem 2rem; text-align: center;">
          <h1>Profil du professionnel</h1>
          <p>Domaine: ${this.domain}</p>
          <p>ID: ${this.id}</p>
          <p>Contenu en cours de développement...</p>
        </div>
      `);
    }
  }
}
