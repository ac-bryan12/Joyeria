import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { PeticionesService } from '../requests/peticiones.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  constructor(private service:PeticionesService,private router: Router,private cookieService:CookieService){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // const url: string = state.url;
      return true;
  }

  check(url:any):true|UrlTree{
    let res: true|UrlTree = this.router.parseUrl('/login');
    if (this.cookieService.check("token")){
      res = true
    }
    return res
  }
  
}
