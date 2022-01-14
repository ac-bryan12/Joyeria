import { Component, OnInit } from '@angular/core';
import { PeticionesService } from 'src/app/services/requests/peticiones.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  productos:any[]= []

  constructor(private service: PeticionesService) { }

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
    //redirect
  }

  eliminarProducto(id:any){
    this.service.peticionDelete("http://localhost:8000/api/articulos").subscribe(res=>{

    },err=>{
      
    })
  }

}
