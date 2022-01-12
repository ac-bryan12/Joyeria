import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private service:PeticionesService, private router:Router) { }

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

  filtrarProductos(valor:any){
    let lista = document.querySelectorAll("h5[class='fw-bolder']")
    console.log(lista)
    //falta realizar
  }

}