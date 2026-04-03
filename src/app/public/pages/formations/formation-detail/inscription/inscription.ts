import { Component, OnInit } from '@angular/core';
import { Candidat } from '../../../../interfaces/candidat';
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from '../../../../../admin/data-service';
import { ApiService } from '../../../../../core/services/api-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-inscription',
  standalone:false,
  templateUrl: './inscription.html',
  styleUrl: './inscription.css',
  //imports:[CommonModule,FormsModule]
})
export class Inscription implements OnInit {
 candidat:Candidat={
    nom: '',
    prenom: '',
    email: '',
    
}
sessionID!:number;
 erreur: string | null = null;
constructor(private route:ActivatedRoute,
 protected router:Router,
  public service:ApiService){}
ngOnInit(): void {
  this.sessionID=Number(this.route.snapshot.paramMap.get('sessionID'));
   console.log('Session ID:', this.sessionID);
}
onSumbit() {
  if (!this.candidat.nom || !this.candidat.prenom || !this.candidat.email) {
    this.erreur = 'Veuillez remplir tous les champs.';
    return;
  }

 
//appel au backend via Apiservice
 this.service.inscrire(this.sessionID, this.candidat).subscribe({
next: (reponse)=>{
  alert('✅ Inscription réussie !');
  this.router.navigate(['/public/formation']);
},
error:(err)=>{
  console.error('Erreur inscription:', err);
        this.erreur = '❌ ' + (err.error?.error || 'Erreur lors de l’inscription');

}
})

}
}
