import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeticionesService {

  constructor(private http:HttpClient) { }


  peticionGet(url:string,isLogin:boolean=false):Observable<any>{
    return this.http.get(url)
  }

  peticionPost(url:string,user:any,isLogin:boolean=false):Observable<any>{
    return this.http.post(url,user)
  }
}
