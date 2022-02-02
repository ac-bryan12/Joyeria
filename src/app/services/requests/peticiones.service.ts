import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class PeticionesService {

  headers = {
    "Authorization": ""
  }

  constructor(private http:HttpClient,private cookieService: CookieService) { }

  set_Token(){
    this.headers.Authorization = "Token "+this.cookieService.get("token")
  }

  peticionGet(url:string,withCredentials:boolean=false):Observable<any>{
    if(!withCredentials){
      return this.http.get(url)
    }else{
      this.set_Token()
      return this.http.get(url,{headers:this.headers})
    }
  }

  peticionPost(url:string,body:any,withCredentials:boolean=false):Observable<any>{
    if(!withCredentials){
      return this.http.post(url,body)
    }else{
      this.set_Token()
      return this.http.post(url,body,{headers:this.headers})
    }
  }

  peticionDelete(url:string):Observable<any>{
    this.set_Token()
    return this.http.delete(url,{headers:this.headers})
  }

  peticionPut(url:string,body:any):Observable<any>{
    this.set_Token()
    return this.http.put(url,body,{headers:this.headers})
  }
}
