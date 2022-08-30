import { Injectable } from '@angular/core';
import { BaseFacade } from '@App/core/abstracts/base.facade';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  deactivateUserAction,
  loadAction,
  selectAction,
  selectActiveUser,
  selectUsers
} from '@App/users/users.state';
import { IUser } from '@App/users/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UsersFacade extends BaseFacade {
  constructor(
    private readonly _http: HttpClient,
    private readonly _stateUsers: Store,
    private readonly _snackBar: MatSnackBar
  ) {
    super(_http, _snackBar);
  }

  get activeUser$(): Observable<IUser | undefined | null> {
    return this._stateUsers.select(selectActiveUser);
  }

  get users$(): Observable<IUser[] | undefined | null> {
    return this._stateUsers.select(selectUsers);
  }

  /**
   * 1. Look for already selected user, if no one is selected,
   * 2. search for one by id, if no one is present,
   * 3. call server for user
   * @param id
   */
  loadAndActivateUserById(id: number): void {
    this._loadHelper<IUser | null>(
      this._stateUsers.select(selectActiveUser).pipe(
        switchMap((selectedUser) => {
          if (selectedUser !== undefined) {
            return this.getUserById(id);
          }
          return of(selectedUser);
        }),
        map((user) => user ?? null),
        tap((user) => this._stateUsers.dispatch(selectAction({ selectedUser: user })))
      ),
      `/users/${id}`,
      (selectedUser: IUser | null) => this._stateUsers.dispatch(selectAction({ selectedUser }))
    );
  }

  getUserById(id: number): Observable<IUser | undefined | null> {
    return this.users$.pipe(map((users) => users?.find((user) => user.id === id)));
  }

  loadUsers(): void {
    this._loadHelper<IUser[] | null>(
      this._stateUsers.select(selectUsers).pipe(map((users) => users ?? null)),
      `/users`,
      (users) => this._stateUsers.dispatch(loadAction({ users }))
    );
  }

  deactivateActiveUser(): void {
    this._stateUsers.dispatch(deactivateUserAction());
  }
}
