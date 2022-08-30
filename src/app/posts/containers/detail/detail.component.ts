import { Component, OnDestroy } from '@angular/core';
import { PostsFacade } from '@App/posts/posts.facade';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, filter, firstValueFrom, map, Observable, of } from 'rxjs';
import { IPost } from '@App/posts/models/post.model';
import { IComment } from '@App/posts/models/comment.model';
import { IUser } from '@App/users/models/user.model';
import { UsersFacade } from '@App/users/users.facade';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PostEditComponent } from '@App/posts/containers/post-edit/post-edit.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnDestroy {
  public post$!: Observable<IPost | undefined | null>;
  public comments$!: Observable<IComment[] | undefined | null>;
  public user$!: Observable<IUser | undefined | null>;
  private _postId!: number;
  private _editDialog!: MatDialogRef<PostEditComponent>;

  constructor(
    private readonly _postsFacade: PostsFacade,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _usersFacade: UsersFacade,
    private readonly _dialog: MatDialog
  ) {
    this.post$ = this._postsFacade.activePost$;
    this.comments$ = this._postsFacade.activeComments$;
    this.user$ = this._usersFacade.activeUser$;

    firstValueFrom(this._activatedRoute.paramMap.pipe(map((params) => params.get('id')))).then(
      (id) => {
        this._postId = parseInt(id ?? '');
        if (isNaN(this._postId)) {
          this.post$ = of(null);
        } else {
          this._postsFacade.loadAndActivatePostById(this._postId);
          this._postsFacade.loadAndActivateCommentsByPostId(this._postId);
        }
      }
    );

    firstValueFrom(this.post$.pipe(filter((post) => !!post))).then((post) => {
      post?.userId ? this._usersFacade.loadAndActivateUserById(post?.userId) : null;
    });
  }

  editPost(): void {
    this._editDialog = this._postsFacade.postDialog();
    this._postsFacade.loadPosts();
    firstValueFrom(combineLatest([this._editDialog.afterClosed(), this.post$])).then(
      ([changed, activePost]) => {
        if (changed && activePost) this._postsFacade.post = activePost;
      }
    );
  }

  deletePost(): void {
    this._postsFacade.deletePostById(this._postId);
  }

  scrollToTop(): void {
    window.scroll({ top: 0, behavior: 'smooth' });
  }

  goBack(): void {
    window.history.back();
  }

  ngOnDestroy() {
    this._postsFacade.deactivateActivePost();
    this._usersFacade.deactivateActiveUser();
  }
}
