import { Component, OnInit } from '@angular/core';
import {  DataService } from '../../data-service';

@Component({
  selector: 'app-admin-dashboard',
  standalone:false,
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard  {
constructor(public service:DataService){}
reset() {
    if (confirm('⚠️ Voulez-vous réinitialiser toutes les données ?\n(Cette action est irréversible.)')) {
      this.service.resetAll();
    }
}
}
