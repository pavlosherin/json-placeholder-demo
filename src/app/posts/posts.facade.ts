import { BaseFacade } from '../core/abstracts/base.facade';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map, Observable, tap } from 'rxjs';
import { IPost, IPostCreate } from './models/post.model';
import { Store } from '@ngrx/store';
import {
  activatePostAction,
  activatePostComments,
  addPostAction,
  deactivatePostAction,
  loadAction,
  loadCommentsAction,
  selectActiveComments,
  selectActivePost,
  selectComments,
  selectPosts,
  updateActivePostAction,
  updatePostsAction
} from './posts.state';
import { IComment } from '@App/posts/models/comment.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PostEditComponent } from '@App/posts/containers/post-edit/post-edit.component';
import { Router } from '@angular/router';
import { namedRoutes } from '@App/routes';

@Injectable()
export class PostsFacade extends BaseFacade {
  constructor(
    private readonly _http: HttpClient,
    private readonly _statePosts: Store,
    private readonly _snackBar: MatSnackBar,
    private readonly _dialog: MatDialog,
    private readonly _router: Router
  ) {
    super(_http, _snackBar);
  }

  get activePost$(): Observable<IPost | undefined | null> {
    return this._statePosts.select(selectActivePost);
  }

  set activePost(activePost: IPost | null) {
    this._statePosts.dispatch(updateActivePostAction({ post: activePost }));
  }

  set post(post: IPost | IPostCreate) {
    if ('id' in post) {
      firstValueFrom(this._patch<IPost, IPost>(`/posts/${post.id}`, post)).then((post) =>
        this._statePosts.dispatch(updatePostsAction({ post }))
      );
    } else {
      firstValueFrom(this._post<IPostCreate, IPost>('/posts', post)).then((post) =>
        this._statePosts.dispatch(addPostAction({ post }))
      );
    }
  }

  get posts$(): Observable<IPost[] | undefined | null> {
    return this._statePosts.select(selectPosts);
  }

  get comments$(): Observable<IComment[] | undefined | null> {
    return this._statePosts.select(selectComments);
  }

  get activeComments$(): Observable<IComment[] | undefined | null> {
    return this._statePosts.select(selectActiveComments);
  }

  private static _sortByLatest(array: any[] | undefined | null): any[] | undefined | null {
    if (array && array?.length > 0) {
      return array?.sort((a, b) => (a > b ? 1 : -1));
    }
    return array;
  }

  deletePostById(id: number): void {
    firstValueFrom(this._delete(`/posts/${id}`)).then(async (res) => {
      if (res) {
        const activePost: IPost | null = await firstValueFrom(this.activePost$).then(
          (post) => post ?? null
        );
        this._statePosts.dispatch(
          updatePostsAction({
            post: activePost,
            remove: true
          })
        );
        this._router.navigate([namedRoutes.app.base]);
      }
    });
  }

  loadPosts(): void {
    this._loadHelper(this._statePosts.select(selectPosts), `/posts`, (posts) =>
      this._statePosts.dispatch(loadAction({ posts: PostsFacade._sortByLatest(posts) ?? null }))
    );
  }

  loadAndActivatePostById(id: number): void {
    this._loadHelper<IPost | null>(
      this._statePosts.select(selectPosts).pipe(
        map((posts) => posts?.find((post) => post.id === id) ?? null),
        tap((post: IPost | null) =>
          this._statePosts.dispatch(activatePostAction({ activePost: post }))
        )
      ),
      `/posts/${id}`,
      (activePost: IPost | null) => this._statePosts.dispatch(activatePostAction({ activePost }))
    );
  }

  loadAndActivateCommentsByPostId(postId: number): void {
    this._loadHelper<IComment[] | undefined | null>(
      this.comments$.pipe(
        map((comments) => comments?.filter((comment) => comment.postId === postId)),
        map((activeComments) =>
          activeComments && activeComments?.length > 0 ? activeComments : null
        ),
        tap((activeComments) => this._statePosts.dispatch(activatePostComments({ activeComments })))
      ),
      `/posts/${postId}/comments`,
      (comments) => {
        this._statePosts.dispatch(activatePostComments({ activeComments: comments ?? null }));
        this._statePosts.dispatch(loadCommentsAction({ comments }));
      }
    );
  }

  resetPosts(): void {
    this._statePosts.dispatch(loadAction({ posts: undefined }));
  }

  deactivateActivePost(): void {
    this._statePosts.dispatch(deactivatePostAction());
  }

  setActivePost(id: number): void {
    firstValueFrom(this.posts$).then((posts) => {
      const activePost: IPost | undefined = posts?.find((post) => post.id === id);
      this._statePosts.dispatch(activatePostAction({ activePost: activePost ?? null }));
    });
  }

  setActiveCommentsByPostId(postId: number): void {
    firstValueFrom(this.comments$).then((comments) => {
      const activeComments: IComment[] | null =
        comments?.filter((comment) => comment?.postId === postId) ?? null;
      this._statePosts.dispatch(activatePostComments({ activeComments }));
    });
  }

  postDialog(): MatDialogRef<PostEditComponent> {
    return this._dialog.open(PostEditComponent, {
      width: `70%`,
      maxWidth: `800px`,
      disableClose: true
    });
  }
}
