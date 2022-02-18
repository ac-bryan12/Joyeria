import { Component, OnInit } from '@angular/core';
import { PeticionesService } from 'src/app/services/requests/peticiones.service';

@Component({
  selector: 'pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  listpedidos:any =[] 
  constructor(private service:PeticionesService) { }

  ngOnInit(): void {
    this.obtenerPedidos()
  }
  obtenerPedidos() {
    this.service.peticionGet("http://localhost:8000/api/shop/pedido",true).subscribe(res=>{
      this.listpedidos = res.pedidos
      console.log(this.listpedidos)
    },err=>{
      alert(err.error.error)
    })
  }

  submenu(id:any){
    let submenu = document.getElementById(id) as HTMLElement
    submenu.classList.toggle("d-none")
  }

  revisarCantidad(cantidad:any,stock:any,amount:any){
    if(cantidad.value>stock+amount){
      alert("El valor de "+cantidad.value+" supera el stock del producto")
      cantidad.value=amount
    }
  }

  eliminarProducto(idProducto:any,lista:any,idPedido:any){
    let valor = 0
    for(let i=0;i<lista.length;i++){
      if(idProducto==lista[i].id){
        valor = i
      }
    }
    lista.pop(valor)
  }
  actualizarPedido(idPedido:any){
    let enviar = []
    let lista = document.querySelectorAll('input[class="'+idPedido+' cantidad"]')
    for (let i = 0; i < lista.length; i++) {
      let item = lista[i] as HTMLInputElement; 
      enviar.push({"id":item.name,"amount":item.value})
    }
    if(confirm("Se actualizará el pedido con los datos proporcionados,¿desea continuar?")){
      this.service.peticionPut("http://localhost:8000/api/shop/pedido/"+idPedido,enviar).subscribe(res=>{
        alert(res.msg)
        window.location.reload()
      },err=>{
        alert(err.error.error)
      })
    }
  }

  eliminarPedido(idPedido:any){
    if(confirm("Una vez eliminé el pedido no podrá recuperarlo,¿desea continuar?")){
      this.service.peticionDelete("http://localhost:8000/api/shop/pedido/"+idPedido).subscribe(res=>{
        alert(res.msg)
        window.location.reload()
      },err=>{
        alert(err.error.error)
      })
    }
  }
}
