import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const namedRoutes = {
  main: ''
};

export const routes: Routes = [
  {
    path: namedRoutes.main,
    component: AppComponent
  }
];
