import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './containers/post/post.component';
import { RouterModule } from '@angular/router';
import { PostsFacade } from './posts.facade';
import { StoreModule } from '@ngrx/store';
import { postsFeature } from './posts.state';
import { CardComponent } from './components/card/card.component';
import { MatCardModule } from '@angular/material/card';
import { postsNamedRoutes } from '@App/posts/posts.routes';
import { DetailComponent } from './containers/detail/detail.component';
import { NewspaperHeaderComponent } from './components/newspaper-header/newspaper-header.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ButtonLinkComponent } from '@App/posts/components/buttons/button-link.component';
import { SpinnerComponent } from '@App/posts/components/spinner/spinner.component';
import { UsersModule } from '@App/users/users.module';

@NgModule({
  declarations: [
    PostComponent,
    CardComponent,
    DetailComponent,
    NewspaperHeaderComponent,
    ButtonLinkComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: postsNamedRoutes.posts.base, component: PostComponent },
      { path: postsNamedRoutes.posts.detail, component: DetailComponent }
    ]),
    StoreModule.forFeature(postsFeature),
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    UsersModule
  ],
  providers: [PostsFacade]
})
export class PostsModule {}
