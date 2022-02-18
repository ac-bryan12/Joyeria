import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userLogged = false

  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {
    document.getElementsByTagName('navbar')[0].classList.remove("d-none")
    if (this.cookieService.check("carrito")){
      let productos = JSON.parse(this.cookieService.get("carrito"))
      let carrito_count:any = document.querySelector("#navbarSupportedContent span.badge.bg-dark.text-white.ms-1.rounded-pill")
      carrito_count.textContent = productos.length
    }
    
    if (this.cookieService.check("token")){
      this.userLogged = true
    }
  }

}
