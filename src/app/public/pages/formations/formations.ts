import { Component, OnInit } from '@angular/core';
import { Formation } from '../../interfaces/formation';

import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../admin/data-service';


@Component({
  selector: 'app-formations',
  standalone:false,
  templateUrl: './formations.html',
  styleUrl: './formations.css',

})
export class Formations implements OnInit {
  searchTerm = '';
  formations: Formation[] = [];
  filteredFormations: Formation[] = [];
  
  

  constructor(private service:DataService,private router:Router,private route:ActivatedRoute) {}

  ngOnInit(): void {
    // Récupérez les formations depuis le service
    this.formations = this.service.getFormations();
    this.filteredFormations = [...this.formations];
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
}

}