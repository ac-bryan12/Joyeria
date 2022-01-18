import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {
    let productos = JSON.parse(this.cookieService.get("carrito"))
    let carrito_count:any = document.querySelector("#navbarSupportedContent span.badge.bg-dark.text-white.ms-1.rounded-pill")
    carrito_count.textContent = productos.length
  }

}
