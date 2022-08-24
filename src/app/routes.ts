import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const namedRoutes = {
  main: { home: '' },
  posts: { main: 'posts' }
};

export const routes: Routes = [
  {
    path: namedRoutes.main.home,
    component: AppComponent
  },
  {
    path: namedRoutes.posts.main,
    loadChildren: () => import('./posts/posts.module').then((m) => m.PostsModule)
  }
];
