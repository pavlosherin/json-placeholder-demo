import { createAction, createFeature, createReducer, on, props } from '@ngrx/store';
import { IPost } from './models/post.model';
import { IComment } from '@App/posts/models/comment.model';
import { StateFunctions } from '@App/shared/functions/state.functions';

export interface IPostState {
  posts: IPost[] | undefined | null;
  comments: IComment[] | undefined | null;
  activePost: IPost | undefined | null;
  activeComments: IComment[] | undefined | null;
  loaded: boolean;
}

export const initialState: IPostState = {
  posts: undefined,
  comments: undefined,
  loaded: false,
  activePost: undefined,
  activeComments: undefined
};

export const loadAction = createAction(
  `[POSTS] load all posts from server`,
  props<{ posts: IPost[] | null | undefined }>()
);
export const loadCommentsAction = createAction(
  `[POSTS] cache comments locally`,
  props<{ comments: IComment[] | null | undefined }>()
);
export const addPostAction = createAction(
  `[POSTS] add new post to state`,
  props<{ post: IPost | null }>()
);
export const activatePostAction = createAction(
  `[POSTS] activate post`,
  props<{ activePost: IPost | null }>()
);
export const activatePostComments = createAction(
  `[POSTS] activate comments`,
  props<{ activeComments: IComment[] | null }>()
);
export const updatePostsAction = createAction(
  `[POSTS] update posts`,
  props<{ post: IPost | null; remove?: boolean }>()
);
export const updateActivePostAction = createAction(
  `[POSTS] update active post`,
  props<{ post: IPost | null }>()
);
export const deactivatePostAction = createAction(`[POSTS] deactivate post, comments`);

export const postsFeature = createFeature({
  name: 'Posts',
  reducer: createReducer(
    initialState,
    on(loadAction, (state, { posts }) => ({ ...state, loaded: posts !== undefined, posts })),
    on(loadCommentsAction, (state, { comments }) => ({
      ...state,
      comments: StateFunctions.addIntoArray<IComment>(state.comments, comments)
    })),
    on(activatePostAction, (state, { activePost }) => ({ ...state, activePost })),
    on(activatePostComments, (state, { activeComments }) => ({ ...state, activeComments })),
    on(deactivatePostAction, (state) => ({
      ...state,
      activePostUser: undefined,
      activePostComments: undefined,
      activePost: undefined
    })),
    on(addPostAction, (state, { post }) => ({
      ...state,
      posts: StateFunctions.addIntoArray<IPost>(state.posts, post)
    })),
    on(updatePostsAction, (state, { post, remove }) => ({
      ...state,
      posts: StateFunctions.updateArrayProperties(state?.posts, post, remove)
    })),
    on(updateActivePostAction, (state, { post }) => ({
      ...state,
      activePost: StateFunctions.updateOneProperty(state?.activePost, post)
    }))
  )
});

export const {
  name,
  reducer,
  selectPosts,
  selectComments,
  selectLoaded,
  selectActivePost,
  selectActiveComments
} = postsFeature;
