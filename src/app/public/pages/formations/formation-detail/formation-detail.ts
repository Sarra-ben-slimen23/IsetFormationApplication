import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { Formation } from '../../../interfaces/formation';
import { Session } from '../../../interfaces/session';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../../../admin/data-service';

@Component({
  selector: 'app-formation-detail',
  standalone:true,
  templateUrl: './formation-detail.html',
  styleUrl: './formation-detail.css',
  imports:[FormsModule,RouterModule,CommonModule]
})
export class FormationDetail implements OnInit {
  formation:Formation|null=null;
  sessions:Session[]=[];
  constructor(private router:Router,private route:ActivatedRoute,private service:DataService ){}
ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID de formation reçu:', id); // Pour débogage
    
    this.formation = this.service.getFormationById(id) || null;
    console.log('Formation trouvée:', this.formation); // Pour débogage
    
    if (this.formation) {
      
      this.sessions = this.service.getSessionsByFormationId(this.formation.id);
      console.log('Sessions trouvées:', this.sessions); // Pour débogage
    }
  }

  openInscriptionModal(sessionID?: number): void {
  if (sessionID) {
    this.router.navigate(['/public/inscription', sessionID]); 
  }
}

  getFormateursNoms(formateurIds: number[]): string {
    return formateurIds
      .map(id => {
        const f = this.service.getFormateurById(id);
        return f ? `${f.prenom} ${f.nom}` : '—';
      })
      .join(', ');
  }

  // Méthode pour ouvrir le PDF
 async openProgrammePdf(): Promise<void> {
  if (!this.formation?.programmePdf) {
    alert('⚠️ Programme non disponible.');
    return;
  }

  try {
    //  Récupère le PDF via fetch (fonctionne en local avec ng serve)
    const response = await fetch(this.formation.programmePdf);
    if (!response.ok) throw new Error('PDF non trouvé');

    const blob = await response.blob();//converssion en fichier binaire
    const url = URL.createObjectURL(blob);//url temporaire

    // Crée un lien temporaire
    const link = document.createElement('a');
    link.href = url;
    link.download = `${this.formation.titre.replace(/\s+/g, '-').toLowerCase()}.pdf`;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();//clique automatquement

    // Nettoyage
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);//Libère la mémoire utilisée par l’URL temporaire.
    }, 100);//100ms seconde aprés le clique
  } catch (err) {
    console.error('Erreur téléchargement PDF :', err);
    alert('❌ Impossible de télécharger le PDF. Veuillez réessayer ou utiliser "Ouvrir dans un nouvel onglet".');
  }
}

// Retourne une liste d'objets { id, nom, prenom, cv }
getFormateursList(formateurIds: number[]): { id: number; nom: string; prenom: string; cv: string }[] {
  return formateurIds
    .map(id => this.service.getFormateurById(id))
    .filter(f => f != null) // élimine null/undefined
    .map(f => ({
      id: f!.id,
      nom: f!.nom,
      prenom: f!.prenom,
      cv: f!.cv || '' // fallback vide si pas de CV
    }));
}

// Méthode pour ouvrir le CV (évite les erreurs si cv est vide)
openCv(event: MouseEvent, cvUrl: string): void {
  if (!cvUrl) {
    event.preventDefault();
    alert('⚠️ CV non disponible pour ce formateur.');
    return;
  }
  // Laisse le href + target="_blank" faire le travail
}
}