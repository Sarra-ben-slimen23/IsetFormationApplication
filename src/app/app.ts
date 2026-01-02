import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { PublicRoutingModule } from './public/public-routing-module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,PublicRoutingModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(public router:Router){}
  protected readonly title = signal('Iset_FormationApplication');
}
