import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Formation } from '../../interfaces/formation';

import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../admin/data-service';
import { ApiService } from '../../../core/services/api-service';
import {  ViewChild, ElementRef } from '@angular/core';
import { BehaviorSubject, combineLatest, map, startWith } from 'rxjs';


@Component({
  selector: 'app-formations',
  standalone:false,
  templateUrl: './formations.html',
  styleUrl: './formations.css',

})
export class Formations implements OnInit {
 /* @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  searchTerm = '';
  formations: Formation[] =[];
  //formations$= new BehaviorSubject<Formation[]>([]);
  filteredFormations: Formation[] = [];
  
  

  constructor(private api:ApiService,private router:Router,private route:ActivatedRoute,
   
  ) {}

  ngOnInit(): void {
    // Récupérez les formations depuis le service
     this.api.getFormations().subscribe({
      next: (data) => {
        
        this.formations = data;
        this.filteredFormations = [...this.formations];
      },
      error: (err) => {
        console.error('Erreur API:', err);
        alert('⚠️ Impossible de charger les formations. Backend démarré ?');
      }
    });
//focus sur le champ de recherche au chargement de la page
    
    setTimeout(() => {
    this.searchInput.nativeElement.focus();
  }, 100); 
    
  }

  filterFormations(): Formation[] {
    if (!this.searchTerm.trim()) {
      return [...this.formations];
    } else {
      const searchLower = this.searchTerm.toLowerCase().trim();
      
      return this.formations.filter(f => {
        // 1. Recherche dans le titre
        if (f.titre.toLowerCase().includes(searchLower)) {
          return true;
        }
        
        // 2. Recherche dans la description
        if (f.description.toLowerCase().includes(searchLower)) {
          return true;
        }
        
        // 3. Recherche dans les tags (vérifiez que f.tags existe)
        if (f.tags && Array.isArray(f.tags)) {
          if (f.tags.some(tag => tag.toLowerCase().includes(searchLower))) {
            return true;
          }
        }
        
        return false;
      });
    }
  }
//Mise à jour immédiate à chaque frappe
  onSearchChange() {
    this.filteredFormations = this.filterFormations();
  }
  trackById(index: number, formation: Formation): number {
  return formation.id;
}*/



  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  private allFormations$ = new BehaviorSubject<Formation[]>([]);
  private searchTerm$ = new BehaviorSubject<string>('');

  // Flux réactif combiné
  filteredFormations$ = combineLatest([
    this.allFormations$,
    this.searchTerm$
  ]).pipe(
    map(([formations, term]) => {
      const searchLower = term.toLowerCase().trim();
      if (!searchLower) return formations;

      return formations.filter(f => {
        const matchesTitle = f.titre.toLowerCase().includes(searchLower);
        const matchesDesc = f.description.toLowerCase().includes(searchLower);
        const matchesTags = f.tags
          .split(',')
          .some(tag => tag.trim().toLowerCase().includes(searchLower));

        return matchesTitle || matchesDesc || matchesTags;
      });
    })
  );

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //  Charge les formations depuis le backend
    this.api.getFormations().subscribe({
      next: (formations) => {
        this.allFormations$.next(formations);
      },
      error: (err) => {
        console.error('Erreur API:', err);
        alert('⚠️ Impossible de charger les formations. Backend démarré ?');
      }
    });

    //  Focus sur le champ de recherche
    setTimeout(() => {
      this.searchInput?.nativeElement.focus();
    }, 100);
  }

  // Mise à jour du terme de recherche
  onSearchChange(term: string): void {
    this.searchTerm$.next(term);
  }

  trackById(index: number, formation: Formation): number {
    return formation.id!;
  }
}


  




