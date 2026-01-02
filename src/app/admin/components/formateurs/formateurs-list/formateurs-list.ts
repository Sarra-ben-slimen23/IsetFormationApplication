import { Component, OnInit } from '@angular/core';
import { Formateur } from '../../../../public/interfaces/formateur';
import { DataService } from '../../../data-service';
//import { AdminService } from '../../../data-service';

@Component({
  selector: 'app-formateurs-list',
  standalone:false,
  
  templateUrl: './formateurs-list.html',
  styleUrl: './formateurs-list.css',
})
export class FormateursList implements OnInit {
formateurs:Formateur[]=[];
modalVisible = false;
  modalMode: 'add' | 'edit' = 'add';
  modalModel: Formateur = { id: 0, nom: '', prenom: '', photo: '', cv: '' ,email:'',cin:'',telephone:'',specialites:[]};
  constructor(private service: DataService){}
  ngOnInit(): void {
    this.formateurs = this.service.getFormateurs();
  }
  openModal(mode: 'add' | 'edit', formateur?: Formateur) {
    this.modalMode = mode;
    this.modalModel = formateur ? { ...formateur } : { id: 0, nom: '', prenom: '', photo: '', cv: '',email:'',cin:'',telephone:'',specialites:[] };
    this.modalVisible = true;
  }
  save() {
    if (this.modalMode === 'add') {
      this.service.addFormateur(this.modalModel);
    } else {
      
      this.service.saveFormateurs(
        this.formateurs.map(f => f.id === this.modalModel.id ? this.modalModel : f)
      );
    }
    this.formateurs = this.service.getFormateurs();
    this.modalVisible = false;
  }
  remove(id: number) {
    if (confirm('Supprimer ce formateur ?')) {
      // Suppression brute (pas de cascade pour l’instant)
      this.formateurs = this.formateurs.filter(f => f.id !== id);
      this.service.saveFormateurs(this.formateurs);
    }
  }


}
