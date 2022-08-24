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
  public posts$: Observable<IPost[]>;

  constructor(private postsFacade: PostsFacade) {
    this.postsFacade.loadPosts();
    this.posts$ = this.postsFacade.getPosts$();
  }

  ngOnInit(): void {}
}
