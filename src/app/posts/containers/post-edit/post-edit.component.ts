import { Component } from '@angular/core';
import { UsersFacade } from '@App/users/users.facade';
import { IUser } from '@App/users/models/user.model';
import { filter, firstValueFrom, Observable } from 'rxjs';
import { PostsFacade } from '@App/posts/posts.facade';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IPost } from '@App/posts/models/post.model';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent {
  public users$: Observable<IUser[] | undefined | null>;
  public form: FormGroup = this._formBuilder.group({});
  public edit = true;
  private _post!: IPost | undefined | null;

  constructor(
    private readonly _usersFacade: UsersFacade,
    private readonly _postsFacade: PostsFacade,
    private readonly _formBuilder: FormBuilder,
    private readonly _dialogRef: MatDialogRef<PostEditComponent>
  ) {
    this._usersFacade.loadUsers();
    this.users$ = this._usersFacade.users$;
    firstValueFrom(this._postsFacade.activePost$.pipe(filter((post) => post !== undefined))).then(
      (post) => {
        this.edit = !!post;
        this._post = post;
        this.form.addControl(
          'title',
          new FormControl(post?.title, { validators: [Validators.required] })
        );
        this.form.addControl('body', new FormControl(post?.body));
        this.form.addControl(
          'userId',
          new FormControl(post?.userId, { validators: [Validators.required] })
        );
      }
    );
  }

  submit(): void {
    this._postsFacade.activePost = {
      ...this._post,
      ...this.form.getRawValue()
    };
    this._usersFacade.loadAndActivateUserById(this.form.get('userId')?.value);
    this._dialogRef.close(true);
  }

  close(): void {
    this._dialogRef.close(false);
  }
}
