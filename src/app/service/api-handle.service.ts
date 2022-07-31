
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiHandleService {

  readonly webUrl = environment.ApiUrl;

  constructor(private http:HttpClient) { }

  getMethod(url:any):Observable<any>{
    return this.http.get(this.webUrl+ url).pipe(
      catchError(this.errorHandling)
    )
  }

  postMethod(url:any,body:any):Observable<any>{
    return this.http.post(this.webUrl+ url,body).pipe(
      catchError(this.errorHandling)
    )

  }

  updateMethod(url:any,id:any):Observable<any>{
    return this.http.put(this.webUrl,url+id).pipe(
      catchError(this.errorHandling)
    )
  }


  deleteMethod(id:any): Observable<any>{
    return this.http.delete<any>(this.webUrl +"blog" +'/'+id).pipe(
      catchError(this.errorHandling)
    )
  }


  errorHandling(error:HttpErrorResponse){

    if(error.error instanceof ErrorEvent){
      console.error(`An Error Occured ${error.error.message}`)
    }
    else{
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };

}
