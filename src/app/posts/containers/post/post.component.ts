import { Component, OnInit } from '@angular/core';
import { PostsFacade } from '../../posts.facade';
import { Observable } from 'rxjs';
import { IPost } from '../../models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  public posts$: Observable<IPost[] | undefined | null>;

  constructor(private readonly _postsFacade: PostsFacade) {
    this._postsFacade.loadPosts();
    this.posts$ = this._postsFacade.posts$;
  }

  ngOnInit(): void {}
}
