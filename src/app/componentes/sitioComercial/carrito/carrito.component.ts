import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { PeticionesService } from 'src/app/services/requests/peticiones.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  productos_id:any[] = []
  productos:any[] = []
  constructor(private cookieService: CookieService,private service: PeticionesService) { }

  ngOnInit(): void {
    if(this.cookieService.check("carrito")){
      this.productos_id = JSON.parse(this.cookieService.get("carrito"))
      for (let producto of this.productos_id){
        this.obtenerInfoProducto(producto.id)
      }
    }  
  }

  obtenerInfoProducto(id:any){
    this.service.peticionGet("http://localhost:8000/api/articulo/"+id).subscribe(res=>{
      this.productos.push(res)
    },err=>{

    })
  }



}
