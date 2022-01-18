import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PeticionesService } from 'src/app/services/requests/peticiones.service';

@Component({
  selector: 'producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit, OnChanges {
  @Input() url : any
  @Input() titulo: any
  
  productos : any = []
  constructor(private service:PeticionesService, private router:Router,private cookieService:CookieService) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  ngOnChanges(changes:SimpleChanges): void {
    if(changes.url){
      this.cargarProductos()
    }
  }

  cargarProductos(){
    this.service.peticionGet(this.url).subscribe(res=>{
      this.productos = res.results
    })
  }

  filtrarProductos(valor:HTMLInputElement){
    let cards = document.querySelectorAll("div[class*='col mb-5']")
    for(let i = 0;i<this.productos.length;i++){
      if(!this.productos[i].nombre.toLowerCase().includes(valor.value.toLowerCase())){
        cards.item(i).classList.add("d-none")
      }
      else{
        cards.item(i).classList.remove("d-none")
      }
    } 
  }

  agregarProducto(id:any){
    let carrito_count:any = document.querySelector("#navbarSupportedContent span.badge.bg-dark.text-white.ms-1.rounded-pill")
    let productos:any[]
    if (this.cookieService.check("carrito")){
      productos = JSON.parse(this.cookieService.get("carrito"))
      for (let producto of productos){
        if (id == producto.id ){
          return
        }
      }
      
      productos.push({
        id: id,
        amount: 1
      })
      this.cookieService.set("carrito",JSON.stringify(productos),{path:"/"})
    }else{
      productos = [{
        id: id,
        amount: 1
      }]
      this.cookieService.set("carrito",JSON.stringify(productos),{path:"/"})
    }

    carrito_count.textContent =  productos.length
  
  }

}
