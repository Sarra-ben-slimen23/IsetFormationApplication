import { Routes } from '@angular/router';

export const routes: Routes = [
  
  {
    path: '',
    redirectTo:'public', //redirige vers /public
    pathMatch:'full'//correspondace exacte
  },
  {
    path:'public',
    loadChildren: () =>
      import('./public/public-module').then(m => m.PublicModule)
  },
  {
    path:'admin-space',
    loadChildren:()=>import('./admin/admin-module').then(m=>m.AdminModule)
  },
  
  /*{
    path: 'test-detail/:id',
    loadComponent: () => import('./public/pages/formations/formation-detail/formation-detail').then(m => m.FormationDetail)
  }*/
];
