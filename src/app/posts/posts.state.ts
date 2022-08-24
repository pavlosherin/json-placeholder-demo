import { createAction, createFeature, createReducer, on, props } from '@ngrx/store';
import { IPost } from './models/post.model';

export interface IPostState {
  posts: IPost[];
}

export const initialState: IPostState = {
  posts: []
};

export const loadAction = createAction(`[POSTS load]`, props<{ posts: IPost[] }>());

export const postsFeature = createFeature({
  name: 'Posts',
  reducer: createReducer(
    initialState,
    on(loadAction, (state, { posts }) => ({ ...state, posts }))
  )
});

export const { name, reducer, selectPosts } = postsFeature;
