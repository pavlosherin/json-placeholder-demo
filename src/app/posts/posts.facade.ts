import { BaseFacade } from '../core/abstracts/base.facade';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map, Observable, switchMap } from 'rxjs';
import { IPost } from './models/post.model';
import { Store } from '@ngrx/store';
import { loadAction, selectLoaded, selectPosts } from './posts.state';
import { ValidateFunctions } from '@App/shared/functions/validate.functions';
import { IComment } from '@App/posts/models/comment.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class PostsFacade extends BaseFacade {
  constructor(
    private readonly _http: HttpClient,
    private readonly _statePosts: Store,
    private readonly _snackBar: MatSnackBar
  ) {
    super(_http, _snackBar);
  }

  get posts$(): Observable<IPost[] | undefined | null> {
    return this._statePosts.select(selectPosts);
  }

  loadPosts(): void {
    firstValueFrom(this._get<IPost[]>('/posts')).then((posts) =>
      this._statePosts.dispatch(loadAction({ posts: posts ?? null }))
    );
  }

  loadPostById(id: number | null): void {
    firstValueFrom(this._get<IPost>(`/posts/${id}`)).then((posts) =>
      this._statePosts.dispatch(loadAction({ posts: posts ? [posts] : null }))
    );
  }

  getPostById(id: number): Observable<IPost | null> {
    if (ValidateFunctions.isMissing(id)) {
      throw Error(`Post id is missing`);
    }
    return this._statePosts.select(selectLoaded).pipe(
      switchMap((loaded) => {
        if (loaded) {
          return this._statePosts.select(selectPosts).pipe(
            map((posts) => posts?.find((post) => post.id === id)),
            map((post) => post ?? null)
          );
        }
        return this._get<IPost>(`/posts/${id}`);
      })
    );
  }

  getCommentsByPostId(id: number): Observable<IComment[] | null> {
    return this._get<IComment[]>(`/posts/${id}/comments`);
  }
}
