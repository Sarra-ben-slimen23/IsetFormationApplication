import { Component, OnInit } from '@angular/core';
//import { AdminService } from '../../../data-service';
import { Candidat } from '../../../../public/interfaces/candidat';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../data-service';

@Component({
  selector: 'app-candidats-list',
  standalone:false,
  templateUrl: './candidats-list.html', 
})
export class CandidatsListComponent implements OnInit {
  candidats: Candidat[] = [];
  modalVisible = false;
  modalMode: 'add' | 'edit' = 'add';
  modalModel: Candidat = { id: 0, nom: '', prenom: '', email: '' };

  constructor(public service :DataService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.candidats = this.service.getCandidats();
  }
   openModal(mode: 'add' | 'edit', candidat?: Candidat) {
    this.modalMode = mode;
    this.modalModel = candidat ? { ...candidat } : { id: 0, nom: '', prenom: '', email: '' };
    this.modalVisible = true;
  }
  save() {
    if (this.modalMode === 'add') {
      this.service.addCandidat(this.modalModel);
    } else {
      this.service.updateCandidat(this.modalModel);
    }
    this.load();
    this.modalVisible = false;
  }
  remove(id: number) {
    if (confirm('Supprimer ce candidat ?')) {
      this.service.deleteCandidat(id);
      this.load();
    }
  }

 

  
}