import { Component, OnInit } from '@angular/core';
import { Categorie } from '../../interfaces/categorie';
import { DataService } from '../../../admin/data-service';


@Component({
  selector: 'app-home',
  
  standalone:false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home  implements OnInit{
  categories:Categorie[]=[];
  constructor(private service:DataService){}
ngOnInit(): void {
  this.categories=this.service.getCategorieList();
}
}
