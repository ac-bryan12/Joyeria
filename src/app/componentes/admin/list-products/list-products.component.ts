import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeticionesService } from 'src/app/services/requests/peticiones.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  productos:any[]= []

  constructor(private service: PeticionesService,private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarProductos()
  }

  cargarProductos(){
    this.service.peticionGet("http://localhost:8000/api/articulos",true).subscribe(res=>{
      this.productos = res.results
    },err=>{
      alert(err.error.error)
    })
  }

  modificarProducto(producto:any){
    this.router.navigate(
      ['../modify_product'],
      { relativeTo:this.route,
        queryParams:{
          id: producto.id,
          nombre: producto.nombre,
          categoria_id: producto.categoria.id,
          image_url: producto.image_url,
          precio: producto.precio,
          promocion: producto.promocion,
          stock:producto.stock
        }
      })
  }

  eliminarProducto(id:any){
    let resp = confirm(`¿Seguro que desea eliminar el producto con id=${id} ?`)
    if(resp){
      this.service.peticionDelete("http://localhost:8000/api/articulos/"+id).subscribe(res=>{
      alert(res.msg)
      window.location.reload()
    },err=>{
      alert(err.error.error)
    })
    }
    
  }

}
