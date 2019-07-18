import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'https://puente-api-heroku.herokuapp.com/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})


export class RestService {
  serverData: JSON;
  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  getAllMembers(){
    /*
    return this.http.get(endpoint + 'all').pipe(
      map(this.extractData)); */

      return this.http.get(endpoint + 'records')
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

