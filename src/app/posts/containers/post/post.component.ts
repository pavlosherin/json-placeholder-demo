import { Component } from '@angular/core';
import { PostsFacade } from '../../posts.facade';
import { combineLatest, firstValueFrom, Observable } from 'rxjs';
import { IPost } from '../../models/post.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { PostEditComponent } from '@App/posts/containers/post-edit/post-edit.component';
import { IUser } from '@App/users/models/user.model';
import { UsersFacade } from '@App/users/users.facade';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  public posts$: Observable<IPost[] | undefined | null>;
  public users$: Observable<IUser[] | undefined | null>;
  private _editDialog!: MatDialogRef<PostEditComponent>;

  constructor(
    private readonly _postsFacade: PostsFacade,
    private readonly _usersFacade: UsersFacade,
    private readonly _snackBar: MatSnackBar
  ) {
    this.posts$ = this._postsFacade.posts$;
    firstValueFrom(this.posts$).then((posts) => {
      if (!posts) this._postsFacade.loadPosts();
    });
    this.users$ = this._usersFacade.users$;
    firstValueFrom(this.users$).then((users) => {
      if (!users) this._usersFacade.loadUsers();
    });
  }

  createPost(): void {
    this._editDialog = this._postsFacade.postDialog();
    this._postsFacade.setActivePost(-1); // new one
    firstValueFrom(combineLatest([this._editDialog.afterClosed(), this._postsFacade.activePost$]))
      .then(([created, activePost]) => {
        if (created && activePost) this._postsFacade.post = activePost;
      })
      .then(() => {
        this._usersFacade.deactivateActiveUser();
        this._postsFacade.deactivateActivePost();
      });
  }

  getUserById$(userId: number): Observable<IUser | undefined | null> {
    return this._usersFacade.getUserById(userId);
  }

  resetPosts(): void {
    this._postsFacade.resetPosts();
    this._postsFacade.loadPosts();
  }
}
