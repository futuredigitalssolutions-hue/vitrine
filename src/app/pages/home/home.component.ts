import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Domain {
  id: string;
  name: string;
  description: string;
  icon: string;
  count: number;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  domains: Domain[] = [
    {
      id: 'avocat',
      name: 'Avocats',
      description: 'Trouvez des avocats spécialisés dans différents domaines du droit',
      icon: '⚖️',
      count: 7
    },
    {
      id: 'medecin',
      name: 'Médecins',
      description: 'Consultez des médecins spécialistes qualifiés',
      icon: '🏥',
      count: 12
    },
    {
      id: 'architecte',
      name: 'Architectes',
      description: 'Découvrez des architectes pour vos projets de construction',
      icon: '🏗️',
      count: 8
    },
    {
      id: 'consultant',
      name: 'Consultants',
      description: 'Contactez des consultants en stratégie d\'entreprise',
      icon: '💼',
      count: 15
    }
  ];

  constructor(private router: Router) {}

  navigateToDomain(domainId: string) {
    this.router.navigate(['/professionals', domainId]);
  }
}
