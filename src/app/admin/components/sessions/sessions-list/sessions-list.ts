import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Session } from '../../../../public/interfaces/session';
import { Formation } from '../../../../public/interfaces/formation';
import { Formateur } from '../../../../public/interfaces/formateur';
//import {  DataService } from '../../../data-service';
import { ApiService } from '../../../../core/services/api-service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sessions-list',
  standalone:false,
  templateUrl: './sessions-list.html',
  styleUrl: './sessions-list.css',
})
export class SessionsList implements OnInit {
//sessions:Session[]=[];
sessions$=new BehaviorSubject<Session[]>([]);
formations$=new BehaviorSubject<Formation[]>([]);
formateurs$=new BehaviorSubject<Formateur[]>([]);

private _formations:Formation[]=[];
private _formateurs:Formateur[]=[];
loading=false;
modalVisible = false;
modalMode: 'add' | 'edit' = 'add';
modalModel: Session = {
    id: 0,
    formationId: 1,
    dateDebut: '',
    dateFin: '',
    formateursIds: [],
    description: '',
    inscriptions: []
  };
  constructor(private service:ApiService,private cdr:ChangeDetectorRef){}
  ngOnInit(): void {
    
    this.loadAll();
  }
  

private loadAll() {
    this.loading = true;
    this.service.getSessions().subscribe(sessions => {
      this.sessions$.next(sessions);

      this.service.getFormations().subscribe(formations => {
        this._formations=formations;
        this.cdr.detectChanges(); //forcer la détection des changements
        this.formations$.next(formations);
        
        this.service.getFormateurs().subscribe(formateurs => {
          this._formateurs=formateurs;
           this.cdr.detectChanges();
          this.formateurs$.next(formateurs);
          this.loading = false;
        });
      });
    });
  }

//
  getFormationTitre(id: number): string {
    const formation = this._formations.find(f => f.id === id);
    return formation ? formation.titre : '—';
  }

//
 getFormateursNoms(ids: number[]): string {
  return ids
    .map(id => {
      const f = this._formateurs.find(form => form.id === id);
      return f ? `${f.prenom} ${f.nom}` : '—';
    })
    .join(', ');
}

  
 openModal(mode: 'add' | 'edit', session?: Session) {
    this.modalMode = mode;
    this.modalModel = session ? { ...session } : {
      id: 0,
      formationId: this._formations[0]?.id || 1,
      dateDebut: '',
      dateFin: '',
      formateursIds: [],
      description: '',
      inscriptions: []
    };
    this.modalVisible = true;
  }


save() {
  if(!this.validateDates()){
    alert("la date de fin doit etre supérieur à la date de début");
    return;
  }
    if (this.modalMode === 'add') {
      this.service.createSession(this.modalModel).subscribe({
        next: () => {
          this.loadAll();
          this.modalVisible = false;
        },
        error: (err) => {
          console.error('Erreur ajout session:', err);
          alert('❌ Erreur lors de l’ajout.');
        }
      });
    } else {
      this.service.updateSession(this.modalModel.id!, this.modalModel).subscribe({
        next: () => {
          this.loadAll();
          this.modalVisible = false;
        },
        error: (err) => {
          console.error('Erreur mise à jour session:', err);
          alert('❌ Erreur lors de la mise à jour.');
        }
      });
    }
  }



  remove(id: number) {
    if (confirm('Supprimer cette session ?')) {
      this.service.deleteSession(id).subscribe({
        next: () => {
          this.loadAll();
        },
        error: (err) => {
          console.error('Erreur suppression session:', err);
          alert('❌ Erreur lors de la suppression.');
        }
      });
    }
  }


  validateDates(): boolean {
  if (!this.modalModel.dateDebut || !this.modalModel.dateFin) {
    return false;
  }
  const debut = new Date(this.modalModel.dateDebut);
  const fin = new Date(this.modalModel.dateFin);
  return fin >= debut && !isNaN(debut.getTime()) && !isNaN(fin.getTime());
}

}
