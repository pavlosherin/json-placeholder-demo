import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { catchError, firstValueFrom, map, Observable, of, switchMap, tap } from 'rxjs';
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

  _post<InputType, OutputType>(
    endpoint: string,
    body: InputType,
    options?: { [param: string]: string | number | boolean }
  ): Observable<OutputType | null> {
    return this.__http.post<OutputType>(`${environment.backendApi}${endpoint}`, body, options).pipe(
      tap(() => this.__snackBar.open('Successfully created')._dismissAfter(5000)),
      catchError(() => {
        this.__snackBar.open('Unable to create');
        return of(null);
      })
    );
  }

  _patch<InputType, OutputType>(
    endpoint: string,
    body: InputType,
    options?: { [param: string]: string | number | boolean }
  ): Observable<OutputType | null> {
    return this.__http
      .patch<OutputType>(`${environment.backendApi}${endpoint}`, body, options)
      .pipe(
        tap(() => this.__snackBar.open('Successfully updated')._dismissAfter(5000)),
        catchError(() => {
          this.__snackBar.open('Unable to update');
          return of(null);
        })
      );
  }

  _delete(
    endpoint: string,
    options?: { [param: string]: string | number | boolean }
  ): Observable<boolean> {
    return this.__http.delete(`${environment.backendApi}${endpoint}`, options).pipe(
      tap(() => this.__snackBar.open('Successfully deleted')._dismissAfter(5000)),
      map(() => true),
      catchError(() => {
        this.__snackBar.open('Unable to delete');
        return of(false);
      })
    );
  }

  /**
   * @param observable
   * @param url if observable is not filled
   * @param dispatchAction after url called
   * @protected
   */
  protected _loadHelper<T>(
    observable: Observable<T>,
    url: string,
    dispatchAction: (res: T | null) => void
  ): void {
    firstValueFrom(
      observable.pipe(
        switchMap((object) => {
          if (object) {
            return of(null);
          }
          return this._get<T>(url);
        })
      )
    ).then((res) => {
      if (res) {
        dispatchAction(res);
      }
    });
  }
}
