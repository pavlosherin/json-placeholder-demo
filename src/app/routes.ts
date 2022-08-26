import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { postsNamedRoutes } from '@App/posts/posts.routes';

export const namedRoutes = {
  app: { base: '' },
  ...postsNamedRoutes
};

export const routes: Routes = [
  {
    path: namedRoutes.app.base,
    component: AppComponent,
    children: [
      {
        path: namedRoutes.appPosts,
        loadChildren: () => import('./posts/posts.module').then((m) => m.PostsModule)
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: namedRoutes.appPosts
      }
    ]
  }
];
