import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SafeHtml } from '@angular/platform-browser';

/**
 * Composant pour afficher et gérer les pages HTML statiques avec navigation fluide
 */
@Component({
  selector: 'app-html-page-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './html-page-viewer.component.html',
  styleUrls: ['./html-page-viewer.component.css']
})
export class HtmlPageViewerComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() htmlContent: SafeHtml = '';
  
  @ViewChild('htmlContainer', { static: false }) htmlContainer!: ElementRef;

  private isBrowser: boolean;

  constructor() {
    const platformId = inject(PLATFORM_ID);
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    // Initialisation du composant
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      this.setupSmoothScrolling();
      this.observeSections();
    }
  }

  ngOnDestroy() {
    if (this.isBrowser) {
      // Cleanup
    }
  }

  /**
   * Configure la navigation fluide pour tous les liens avec data-scroll-to
   */
  private setupSmoothScrolling() {
    const container = this.htmlContainer?.nativeElement;
    if (!container) return;

    // Trouver tous les liens de navigation (data-scroll-to)
    const scrollLinks = container.querySelectorAll('[data-scroll-to]');

    scrollLinks.forEach((link: Element) => {
      link.addEventListener('click', (e: Event) => {
        const targetId = link.getAttribute('data-scroll-to');

        if (!targetId) return;

        e.preventDefault();

        // Trouver l'élément cible dans le conteneur
        const target = container.querySelector(`#${targetId}`);

        if (target) {
          this.scrollToElement(target, container);
          this.updateActiveLink(link, container);
        }
      });
    });
  }

  /**
   * Effectue le scroll fluide vers un élément
   */
  private scrollToElement(target: Element, container: Element) {
    const headerHeight = container.querySelector('header')?.clientHeight || 90;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }

  /**
   * Met à jour le lien actif lors du clic
   */
  private updateActiveLink(clickedLink: Element, container: Element) {
    const allScrollLinks = container.querySelectorAll('[data-scroll-to]');
    allScrollLinks.forEach((link: Element) => {
      link.classList.remove('active');
    });
    clickedLink.classList.add('active');
  }

  /**
   * Observe les sections pour mettre à jour le lien actif lors du scroll
   */
  private observeSections() {
    const container = this.htmlContainer?.nativeElement;
    if (!container) return;

    const sections = container.querySelectorAll('section[id]');
    if (sections.length === 0) return;

    const options = {
      root: null,
      rootMargin: '0px 0px -50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const activeLink = container.querySelector(`[data-scroll-to="${sectionId}"]`);
          
          if (activeLink) {
            const allScrollLinks = container.querySelectorAll('[data-scroll-to]');
            allScrollLinks.forEach((link: Element) => {
              link.classList.remove('active');
            });
            activeLink.classList.add('active');
          }
        }
      });
    }, options);

    sections.forEach((section: Element) => {
      observer.observe(section);
    });
  }
}

