import { createAction, createFeature, createReducer, on, props } from '@ngrx/store';
import { IUser } from '@App/users/models/user.model';

export interface IUserState {
  users: IUser[] | undefined | null;
  selectedUser: IUser | undefined | null;
}

export const initialState: IUserState = {
  users: undefined,
  selectedUser: null
};

export const selectAction = createAction(
  `[USERS] select active user`,
  props<{ selectedUser: IUser | null }>()
);
export const loadAction = createAction(
  `[USERS] load users from server`,
  props<{ users: IUser[] | null }>()
);
export const deactivateUserAction = createAction(`[USERS] deselect user`);

export const usersFeature = createFeature({
  name: 'Users',
  reducer: createReducer(
    initialState,
    on(selectAction, (state, { selectedUser }) => ({ ...state, selectedUser })),
    on(loadAction, (state, { users }) => ({ ...state, users })),
    on(deactivateUserAction, (state) => ({ ...state, selectedUser: null }))
  )
});

export const { name, reducer, selectUsers, selectSelectedUser: selectActiveUser } = usersFeature;
