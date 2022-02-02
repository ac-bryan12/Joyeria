import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  cantidadProductos:number = 0
  totalProductos:number = 0.0

  constructor(private cookieService: CookieService,private service: PeticionesService,private router: Router) { }

  ngOnInit(): void {
    if(this.cookieService.check("returnURL")){
      this.cookieService.delete("returnURL")
    }
    if(this.cookieService.check("carrito")){
      this.productos_id = JSON.parse(this.cookieService.get("carrito"))
      for (let producto of this.productos_id){
        this.obtenerInfoProducto(producto.id)
      }
      setTimeout(() => {
        this.actualizarCantidadSeleccionada()
        this.calcularTotalProductos(); 
        this.calcularCantidadProductos();
      }, 1000);
    }  
  }

  actualizarCantidadSeleccionada(){
    for(let producto of this.productos_id){
      let inputNumber:any = document.getElementById(producto.id) as HTMLInputElement
      inputNumber.value = producto.amount
    }
  }

  calcularCantidadProductos(){
    this.cantidadProductos = 0
    let cantidades:any = document.querySelectorAll("input[type$='number']")
    for(let cantidad of cantidades){
      this.cantidadProductos += parseInt(cantidad.value)
    }
  }

  calcularTotalProductos(){
    this.totalProductos = 0
    let subtotales:any = document.querySelectorAll("p[id^='total_']")
    for(let sub of subtotales){
      this.totalProductos += parseFloat(sub.innerHTML.replace("$",""))
    }
  }

  obtenerInfoProducto(id:any){
    this.service.peticionGet("http://localhost:8000/api/articulo/"+id).subscribe(res=>{
      this.productos.push(res)
    },err=>{

    })
  }

  actualizarTotal(id:any,precio:any,promocion:any){
    let inputNumber:any = document.getElementById(id) as HTMLInputElement
    let labelTotal:any = document.getElementById("total_"+id)

    let productos:any[] = JSON.parse(this.cookieService.get("carrito"))
    for (let i = 0; i < productos.length;i++){
      if (productos[i].id == id){
        productos[i].amount = inputNumber.value
        break
      }
    }
    this.cookieService.set("carrito",JSON.stringify(productos),{path:"/"})

    if (promocion){
      labelTotal.innerHTML = "$"+(inputNumber.value * promocion).toFixed(2)
    }else{
      labelTotal.innerHTML = "$"+(inputNumber.value * precio).toFixed(2)
    }
    this.calcularTotalProductos()
    this.calcularCantidadProductos()
  }

  eliminarProducto(id:any){
    if (confirm("¿Seguro deseas eliminar este producto del carrito?")){
      let productos:any[] = JSON.parse(this.cookieService.get("carrito"))
      for (let i = 0; i < productos.length;i++){
        if (productos[i].id == id){
          productos.splice(i,1)
          break
        }
      }
      this.cookieService.set("carrito",JSON.stringify(productos),{path:"/"})
      window.location.reload()
    }
  }

  realizarPedido(){
    if (this.cookieService.check("carrito") && confirm("Se creará un nuevo pedido con tu usuario")){
      let pedido:any = JSON.parse(this.cookieService.get("carrito"))
      if (pedido){
        if (this.cookieService.check("token")){
          this.service.peticionPost("http://localhost:8000/api/shop/pedido",pedido,true).subscribe(res=>{
            alert(res.msg)
            this.cookieService.delete("carrito")
            this.router.navigate(["/portal/pedidos"])
          },err=>{
            alert(err.error.error)
          })  
        }else{
          this.router.navigate(["/login"])
          this.cookieService.set("returnURL",this.router.url,{path:"/"})
        }
        
      }
    }
  }
  

}
