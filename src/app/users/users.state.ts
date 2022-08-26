import { createAction, createFeature, createReducer, on, props } from '@ngrx/store';
import { IUser } from '@App/users/models/user.model';

export interface IUserState {
  selectedUser: IUser | null;
}

export const initialState: IUserState = {
  selectedUser: null
};

export const selectAction = createAction(
  `[USERS select user]`,
  props<{ selectedUser: IUser | null }>()
);
export const deselectAction = createAction(`[USERS deselect user]`);

export const usersFeature = createFeature({
  name: 'Users',
  reducer: createReducer(
    initialState,
    on(selectAction, (state, { selectedUser }) => ({ ...state, selectedUser })),
    on(deselectAction, (state) => ({ ...state, selectedUser: null }))
  )
});

export const { name, reducer, selectSelectedUser } = usersFeature;
