import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { catchError, Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export abstract class BaseFacade {
  protected constructor(private readonly __http: HttpClient, private __snackBar: MatSnackBar) {}

  _get<T>(
    endpoint: string,
    params?: { [param: string]: string | number | boolean }
  ): Observable<T | null> {
    return this.__http
      .get<T>(`${environment.backendApi}${endpoint}`, { observe: 'body', params })
      .pipe(
        catchError(() => {
          this.__snackBar.open('Unable to connect to server');
          return of(null);
        })
      );
  }
}
