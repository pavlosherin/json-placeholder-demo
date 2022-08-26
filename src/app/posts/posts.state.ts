import { createAction, createFeature, createReducer, on, props } from '@ngrx/store';
import { IPost } from './models/post.model';
import { IComment } from '@App/posts/models/comment.model';
import { IUser } from '@App/users/models/user.model';

export interface IPostState {
  posts: IPost[] | undefined | null;
  activePost: IPost | undefined | null;
  activePostComments: IComment[] | undefined | null;
  activePostUser: IUser | undefined | null;
  loaded: boolean;
}

export const initialState: IPostState = {
  posts: undefined,
  loaded: false,
  activePost: undefined,
  activePostComments: undefined,
  activePostUser: undefined
};

export const loadAction = createAction(`[POSTS] load`, props<{ posts: IPost[] | null }>());
export const activatePostAction = createAction(`[POSTS] activate`, props<{ activePost: IPost }>());
export const activePostComments = createAction(
  `[POSTS] activate comments`,
  props<{ activePostComments: IComment[] }>()
);
export const activePostUser = createAction(
  `[POSTS] activate user`,
  props<{ activePostUser: IUser }>()
);
export const deactivatePostAction = createAction(`[POSTS] deactivate post, comments, user`);

export const postsFeature = createFeature({
  name: 'Posts',
  reducer: createReducer(
    initialState,
    on(loadAction, (state, { posts }) => ({ ...state, loaded: true, posts })),
    on(activatePostAction, (state, { activePost }) => ({ ...state, activePost })),
    on(activePostComments, (state, { activePostComments }) => ({ ...state, activePostComments })),
    on(activePostUser, (state, { activePostUser }) => ({ ...state, activePostUser })),
    on(deactivatePostAction, (state) => ({
      ...state,
      activePostUser: undefined,
      activePostComments: undefined,
      activePost: undefined
    }))
  )
});

export const { name, reducer, selectPosts, selectLoaded } = postsFeature;
