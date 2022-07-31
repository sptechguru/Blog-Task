import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiHandleService {

  readonly webUrl = environment.ApiUrl;

  constructor(private http:HttpClient) { }

  getMethod(url:any){
    return this.http.get(this.webUrl+ url);
  }

  postMethod(url:any,body:any){
    return this.http.post(this.webUrl+ url,body);

  }

  updateMethod(url:any,id:any){
    return this.http.put(this.webUrl+ url,id);
  }

  deleteMethod(url:any,id:any){
    return this.http.delete(this.webUrl+ url,id);
  }


}
