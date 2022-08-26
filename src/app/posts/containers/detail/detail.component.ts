import { Component } from '@angular/core';
import { PostsFacade } from '@App/posts/posts.facade';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, map, Observable, of } from 'rxjs';
import { IPost } from '@App/posts/models/post.model';
import { IComment } from '@App/posts/models/comment.model';
import { IUser } from '@App/users/models/user.model';
import { UsersFacade } from '@App/users/users.facade';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {
  public post$!: Observable<IPost | null>;
  public comments$!: Observable<IComment[] | null>;
  public user$!: Observable<IUser | null>;
  private _postId!: number;

  constructor(
    private readonly _postsFacade: PostsFacade,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _usersFacade: UsersFacade
  ) {
    firstValueFrom(this._activatedRoute.paramMap.pipe(map((params) => params.get('id')))).then(
      (id) => {
        this._postId = parseInt(id ?? '');
        if (isNaN(this._postId)) {
          this.post$ = of(null);
        } else {
          this._postsFacade.loadPostById(this._postId);
          this.post$ = this._postsFacade.getPostById(this._postId);
          this.comments$ = this._postsFacade.getCommentsByPostId(this._postId);
          firstValueFrom(this.post$).then((post) =>
            post?.userId ? this._usersFacade.loadUserById(post?.userId) : null
          );
          this.user$ = this._usersFacade.getSelectedUser$();
        }
      }
    );
  }

  scrollToTop(): void {
    window.scroll({ top: 0, behavior: 'smooth' });
  }

  goBack(): void {
    window.history.back();
  }
}
