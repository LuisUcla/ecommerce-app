import { Routes } from '@angular/router';

const routes: Routes = [
    { 
        path: '', // --> ruta padre
        loadComponent: () => import('./products.component')
    },
    { 
        path: ':id',
        loadComponent: () => import('./details/details.component')
    },
   
];

export default routes;