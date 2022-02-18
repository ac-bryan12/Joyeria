import { UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {
  titulo:any
  url:any
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.opcion()
  }

  opcion(){
    let title = this.router.parseUrl(this.router.url).queryParams["name"]
    this.titulo = title
    if(title == "piercings_falsos"){
      this.titulo = this.titulo.replace("_","-")
    }
    this.url = "http://localhost:8000/api/articulos?categoria="+title
    
  }

}
