import { Component, OnInit } from '@angular/core';
import { Formation } from '../../../../public/interfaces/formation';
import { DataService } from '../../../data-service';

@Component({
  selector: 'app-formations-list',
  standalone:false,
  templateUrl: './formations-list.html',
  styleUrl: './formations-list.css',
})
export class FormationsList  implements OnInit{
formations:Formation[]=[];
modalVisible = false;
  modalMode: 'add' | 'edit' = 'add';
  modalModel: Formation = {
    id: 0,
    titre: '',
    description: '',
    chargeHoraire: 0,
    programmePdf: '',
    niveau: 'débutant',
    tags: [],
    categories: []
  };
  constructor(private service:DataService){}
   ngOnInit() {
    this.formations = this.service.getFormations();
  }
  updateTags(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.modalModel.tags = value.split(',').map(t => t.trim()).filter(t => t);
  }
 openModal(mode: 'add' | 'edit', formation?: Formation) {
    this.modalMode = mode;
    this.modalModel = formation ? { ...formation } : { ...this.modalModel };
    this.modalVisible = true;
  }
save() {
    if (this.modalMode === 'add') {
      this.service.addFormation(this.modalModel);
    } else {
      this.service.saveFormations(
        this.formations.map(f => f.id === this.modalModel.id ? this.modalModel : f)
      );
    }
    this.formations = this.service.getFormations();
    this.modalVisible = false;
  }
  remove(id: number) {
    if (confirm('Supprimer cette formation ?\n⚠️ Les sessions associées seront perdues.')) {
      this.formations = this.formations.filter(f => f.id !== id);
      this.service.saveFormations(this.formations);
    }
  }

}
