import { Component, OnInit } from '@angular/core';
import { Session } from '../../../../public/interfaces/session';
import { Formation } from '../../../../public/interfaces/formation';
import { Formateur } from '../../../../public/interfaces/formateur';
import {  DataService } from '../../../data-service';

@Component({
  selector: 'app-sessions-list',
  standalone:false,
  templateUrl: './sessions-list.html',
  styleUrl: './sessions-list.css',
})
export class SessionsList implements OnInit {
sessions:Session[]=[];
formations:Formation[]=[];
formateurs:Formateur[]=[];
modalVisible = false;
modalMode: 'add' | 'edit' = 'add';
modalModel: Session = {
    id: 0,
    formationId: 1,
    dateDebut: '',
    dateFin: '',
    formateursIds: [],
    description: '',
    candidats: []
  };
  constructor(private service:DataService){}
  ngOnInit(): void {
    this.sessions = this.service.getSessions();
    this.formations = this.service.getFormations();
    this.formateurs = this.service.getFormateurs();
  }
  getFormationTitre(id: number): string {
    return this.service.getFormationById(id)?.titre || '—';
  }
  getFormateursNoms(ids: number[]): string {
    return ids
      .map(id => {
        const f = this.service.getFormateurById(id);
        return f ? `${f.prenom} ${f.nom}` : '—';
      })
      .join(', ');
  }
  openModal(mode: 'add' | 'edit', session?: Session) {
    this.modalMode = mode;
    this.modalModel = session ? { ...session } : {
      id: 0,
      formationId: this.formations[0]?.id || 1,
      dateDebut: '',
      dateFin: '',
      formateursIds: [],
      description: '',
      candidats: []
    };
    this.modalVisible = true;
  }
   save() {
    if (this.modalMode === 'add') {
      this.service.addSession(this.modalModel);
    } else {
      this.service.saveSessions(
        this.sessions.map(s => s.id === this.modalModel.id ? this.modalModel : s)
      );
    }
    this.sessions = this.service.getSessions();
    this.modalVisible = false;
  }
  remove(id: number) {
    if (confirm('Supprimer cette session ?')) {
      this.sessions = this.sessions.filter(s => s.id !== id);
      this.service.saveSessions(this.sessions);
    }
  }



}
