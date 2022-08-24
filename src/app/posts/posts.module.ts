import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './containers/post/post.component';
import { RouterModule } from '@angular/router';
import { PostsFacade } from './posts.facade';
import { StoreModule } from '@ngrx/store';
import { postsFeature } from './posts.state';

@NgModule({
  declarations: [PostComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: PostComponent }]),
    StoreModule.forFeature(postsFeature)
  ],
  providers: [PostsFacade]
})
export class PostsModule {}
