import { Component } from '@angular/core';
import { ApiService } from '../../../core/services/api-service';

@Component({
  selector: 'app-inscriptions',
  imports: [],
  templateUrl: './inscriptions.html',
  styleUrl: './inscriptions.css',
})
export class Inscriptions {
  inscriptions: any[] = [];

constructor(private api: ApiService) {}

ngOnInit() {
  this.api.getInscriptions().subscribe({
    next: (data) => {
      this.inscriptions = data;
    },
    error: (err) => {
      console.error('Erreur chargement inscriptions:', err);
      // Option : Afficher un message à l'utilisateur
    }
  });
}
}
