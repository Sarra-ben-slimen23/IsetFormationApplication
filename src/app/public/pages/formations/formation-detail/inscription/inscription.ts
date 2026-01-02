import { Component, OnInit } from '@angular/core';
import { Candidat } from '../../../../interfaces/candidat';
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from '../../../../../admin/data-service';


@Component({
  selector: 'app-inscription',
  standalone:false,
  templateUrl: './inscription.html',
  styleUrl: './inscription.css',
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
  public service:DataService){}
ngOnInit(): void {
  this.sessionID=Number(this.route.snapshot.paramMap.get('sessionID'));
   console.log('Session ID:', this.sessionID);
}
onSumbit() {
  if (!this.candidat.nom || !this.candidat.prenom || !this.candidat.email) {
    this.erreur = 'Veuillez remplir tous les champs.';
    return;
  }

  const result = this.service.inscrireCandidat(this.sessionID, this.candidat);
  
  if (result.success) {
    alert('✅ ' + result.message);
    const formationId = this.service.getFormationIdBySessionId(this.sessionID);
    if (formationId) {
      this.router.navigate(['/public/formation', formationId]);
    }
  } else {
    this.erreur = '❌ ' + result.message;
  }
}
}
