import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { catchError, Observable } from 'rxjs';

@Injectable()
export abstract class BaseFacade {
  protected constructor(private __http: HttpClient) {}

  _get<T>(
    endpoint: string,
    params?: { [param: string]: string | number | boolean }
  ): Observable<T> {
    return this.__http
      .get<T>(`${environment.backendApi}${endpoint}`, { observe: 'body', params })
      .pipe(
        catchError((err) => {
          // TODO: Handle Errors
          throw Error(err?.message);
        })
      );
  }
}
