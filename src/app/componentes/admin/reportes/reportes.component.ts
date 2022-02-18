import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeticionesService } from 'src/app/services/requests/peticiones.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  busqueda:FormGroup
  reporteGenerado =false
  lista:any = []
  constructor(private fb:FormBuilder, private service:PeticionesService) { 
    this.busqueda = this.fb.group({
      fechaInicio: this.fb.control('',[Validators.required]),
      fechaFin: this.fb.control('',[Validators.required])
    })
  }

  ngOnInit(): void {
  }

  crearReporte(form:any){
    this.lista = []
    this.service.peticionPost("http://localhost:8000/api/reportes",form,true).subscribe(res=>{
      for(let item in res.data){
        let atr = res.data[item]
        this.lista.push({id:item,nombre:atr["nombre"],cantidad:atr["cantidad"],cliente:atr["cliente"]})
      }
      this.reporteGenerado = true
      alert("Reporte Generado con éxito")
    },err=>{
      alert(err.error.error)
    })
  }

}
