import { Injectable } from '@angular/core';
import { BaseFacade } from '@App/core/abstracts/base.facade';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAction, selectSelectedUser } from '@App/users/users.state';
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

  loadUserById(id: number): void {
    firstValueFrom(this._get<IUser>(`/users/${id}`)).then((selectedUser) =>
      this._stateUsers.dispatch(selectAction({ selectedUser }))
    );
  }

  getSelectedUser$(): Observable<IUser | null> {
    return this._stateUsers.select(selectSelectedUser);
  }
}
