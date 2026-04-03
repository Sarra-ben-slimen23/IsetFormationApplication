import { Component, OnInit } from '@angular/core';
import { Formateur } from '../../../../public/interfaces/formateur';
import { DataService } from '../../../data-service';
import { ApiService } from '../../../../core/services/api-service';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-formateurs-list',
  standalone:false,
  
  templateUrl: './formateurs-list.html',
  styleUrl: './formateurs-list.css',
})
export class FormateursList implements OnInit {
//formateurs:Formateur[]=[];
formateur$=new BehaviorSubject<Formateur[]>([]);
loading=false;
modalVisible = false;
  modalMode: 'add' | 'edit' = 'add';
  modalModel: Formateur = { id: 0, nom: '', prenom: '',email:'', photo: '', cv: '',cin:'',telephone:'',specialites:''};
  constructor(private service: ApiService){}
  ngOnInit(): void {
   
    this.loadFormateurs();
  }
  
 private loadFormateurs() {
    this.loading = true;
    

    this.service.getFormateurs().subscribe(data=>this.formateur$.next(data));
  }

  openModal(mode: 'add' | 'edit', formateur?: Formateur) {
    this.modalMode = mode;
    this.modalModel = formateur ? { ...formateur } : { id: 0, nom: '', prenom: '', photo: '', cv: '',email:'',cin:'',telephone:'',specialites:'' };
    this.modalVisible = true;
  }

   save() {
    if (this.modalMode === 'add') {
      this.service.createFormateur(this.modalModel).subscribe({
        next: () => {
          this.loadFormateurs();
          this.modalVisible = false;
        },
        error: (err) => {
          console.error('Erreur ajout formateur:', err);
          alert('❌ Erreur lors de l’ajout.');
        }
      });
    } else {
      this.service.updateFormateur(this.modalModel.id!, this.modalModel).subscribe({
        next: () => {
          this.loadFormateurs();
          this.modalVisible = false;
        },
        error: (err) => {
          console.error('Erreur mise à jour formateur:', err);
          alert('❌ Erreur lors de la mise à jour.');
        }
      });
    }
  }


  remove(id: number) {
    if (confirm('Supprimer ce formateur ?')) {
      this.service.deleteFormateur(id).subscribe({
        next: () => {
          this.loadFormateurs();
        },
        error: (err) => {
          console.error('Erreur suppression formateur:', err);
          alert('❌ Erreur lors de la suppression.');
        }
      });
    }
  }

//méthodes pour gérer les photos des formateurs
private readonly DEFAULT_PHOTO = 'assets/images/default.jpg';
getPhotoUrl(photoPath:string|null|undefined):string{
  if (!photoPath || photoPath.trim() === '') {
    return this.DEFAULT_PHOTO;
  }
  let cleanPath = photoPath.trim();
    
  // Si le chemin commence par "assets/" → on l’utilise tel quel
  if (cleanPath.startsWith('assets/')) {
    return cleanPath;
  }
  if(!cleanPath.includes('/')){
    cleanPath = `assets/images/${cleanPath}`;
    return cleanPath;
  }
return cleanPath;
}


}
