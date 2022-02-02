import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PeticionesService } from '../requests/peticiones.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  constructor(private service:PeticionesService,private router: Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // const url: string = state.url;
      return true;
  }

  // check(url:any):true|UrlTree{
  //   let res: true|UrlTree = this.router.parseUrl('/login');
  //   this.service.peticionGet("http://localhost:8000/auth/user_credentials/").subscribe(res=>{
  //     if(res.group == "admin"){
  //       res = true
  //     }
  //   })
  //   setTimeout(() => { }, 2000);
  //   // Store the attempted URL for redirecting
  //   // this.authService.redirectUrl = url;

  //   // Redirect to the login page
  //   return res
  // }
  
}
