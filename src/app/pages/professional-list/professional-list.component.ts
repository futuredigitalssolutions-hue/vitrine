import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

interface Professional {
  id: number;
  name: string;
  specialty: string;
  location: string;
  image: string;
  tags: string[];
}

@Component({
  selector: 'app-professional-list',
  imports: [CommonModule],
  templateUrl: './professional-list.component.html',
  styleUrls: ['./professional-list.component.css']
})
export class ProfessionalListComponent implements OnInit {
  domain: string = '';
  professionals: Professional[] = [];

  // Données de démonstration
  private allProfessionals: { [key: string]: Professional[] } = {
    avocat: [
      { id: 1, name: 'Avocat 1', specialty: 'استئناف', location: 'Centre ville Sfax, Tunisie', image: 'assets/images/femme.jpeg', tags: ['Droit civil', 'Droit familial'] },
      { id: 2, name: 'Avocat 2', specialty: 'محامية استئناف', location: 'Ariana, Tunisie', image: 'assets/images/homme.jpeg', tags: ['Droit pénal', 'Droit commercial'] }
    ],
    medecin: [
      { id: 1, name: 'Dr. Médecin 1', specialty: 'Cardiologue', location: 'Tunis, Tunisie', image: 'assets/images/homme.jpeg', tags: ['Cardiologie'] },
      { id: 2, name: 'Dr. Médecin 2', specialty: 'Pédiatre', location: 'Sfax, Tunisie', image: 'assets/images/femme.jpeg', tags: ['Pédiatrie'] },
      { id: 3, name: 'Dr. Médecin 3', specialty: 'Dermatologue', location: 'Sousse, Tunisie', image: 'assets/images/homme.jpeg', tags: ['Dermatologie'] }
    ],
    architecte: [
      { id: 1, name: 'Architecte 1', specialty: 'Architecture moderne', location: 'Tunis, Tunisie', image: 'assets/images/homme.jpeg', tags: ['Design moderne'] },
      { id: 2, name: 'Architecte 2', specialty: 'Architecture d\'intérieur', location: 'Sfax, Tunisie', image: 'assets/images/femme.jpeg', tags: ['Intérieur'] },
      { id: 3, name: 'Architecte 3', specialty: 'Urbanisme', location: 'Sousse, Tunisie', image: 'assets/images/homme.jpeg', tags: ['Urbanisme'] }
    ],
    consultant: [
      { id: 1, name: 'Consultant 1', specialty: 'Stratégie d\'entreprise', location: 'Tunis, Tunisie', image: 'assets/images/femme.jpeg', tags: ['Stratégie'] },
      { id: 2, name: 'Consultant 2', specialty: 'Marketing digital', location: 'Sfax, Tunisie', image: 'assets/images/homme.jpeg', tags: ['Marketing'] },
      { id: 3, name: 'Consultant 3', specialty: 'RH et recrutement', location: 'Sousse, Tunisie', image: 'assets/images/femme.jpeg', tags: ['RH'] }
    ]
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.domain = params['domain'];
      this.professionals = this.allProfessionals[this.domain] || [];
    });
  }

  getDomainName(): string {
    const domainNames: { [key: string]: string } = {
      avocat: 'Avocats',
      medecin: 'Médecins',
      architecte: 'Architectes',
      consultant: 'Consultants'
    };
    return domainNames[this.domain] || this.domain;
  }

  navigateToDetail(id: number) {
    this.router.navigate(['/professional', this.domain, id]);
  }

  goBack() {
    this.location.back();
  }
}
