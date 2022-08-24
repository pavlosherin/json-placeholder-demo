import { BaseFacade } from '../core/abstracts/base.facade';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { IPost } from './models/post.model';
import { Store } from '@ngrx/store';
import { loadAction, selectPosts } from './posts.state';

@Injectable()
export class PostsFacade extends BaseFacade {
  constructor(private readonly _http: HttpClient, private readonly _statePosts: Store) {
    super(_http);
  }

  loadPosts(): void {
    firstValueFrom(this._get<IPost[]>('/posts')).then((posts) =>
      this._statePosts.dispatch(loadAction({ posts }))
    );
  }

  getPosts$(): Observable<IPost[]> {
    return this._statePosts.select(selectPosts);
  }
}
