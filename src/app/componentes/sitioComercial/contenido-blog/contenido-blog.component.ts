import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PeticionesService } from 'src/app/services/requests/peticiones.service';

@Component({
  selector: 'app-contenido-blog',
  templateUrl: './contenido-blog.component.html',
  styleUrls: ['./contenido-blog.component.css']
})
export class ContenidoBlogComponent implements OnInit {

  constructor(private service: PeticionesService, private router: Router) { }

  id: any
  ngOnInit(): void {
    this.id = this.router.parseUrl(this.router.url).queryParams["id"]
    this.generarContenido()
  }


  generarContenido(){
    this.service.peticionGet("http://localhost:8000/api/blog/publicacion/"+this.id).subscribe(res=>{
      let cont = document.getElementById("contenido") as HTMLElement
      cont.innerHTML = atob(res.contenido)
    })
  }
}
