import { Component, OnInit } from '@angular/core';
import { PeticionesService } from 'src/app/services/requests/peticiones.service';

@Component({
  selector: 'app-reporte-categoria',
  templateUrl: './reporte-categoria.component.html',
  styleUrls: ['./reporte-categoria.component.css']
})
export class ReporteCategoriaComponent implements OnInit {

  categorias:any[] = []
  constructor(private service: PeticionesService) { }

  ngOnInit(): void {
    this.cargarCategorias()
  }

  cargarCategorias(){
    this.service.peticionGet("http://localhost:8000/api/articulos/categorias",true).subscribe(res=>{
      this.categorias = res
    },err=>{
      alert(err.error.error)
    })
  }
  crearReporte(){
    this.service.peticionGet("http://localhost:8000/api/reportes",true).subscribe(res=>{
      console.log(res)
    },err=>{
      alert(err.error.error)
    })
  }

}
