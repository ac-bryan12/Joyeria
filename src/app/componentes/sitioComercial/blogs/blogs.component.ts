import { toBase64String } from '@angular/compiler/src/output/source_map';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeticionesService } from 'src/app/services/requests/peticiones.service';

@Component({
  selector: 'blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  blogs: any

  constructor(private service: PeticionesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarBlogs()
  }

  cargarBlogs() {
    this.service.peticionGet("http://localhost:8000/api/blog/list_publicacion/", true).subscribe(res => {
      this.blogs = res

    })
  }

  obtenerId(valor:any) {
    console.log(valor.id)
    this.router.navigate(["/contenido"],{relativeTo:this.route,queryParams:{id: valor.id}})
  }

}
