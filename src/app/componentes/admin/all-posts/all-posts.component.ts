import { Component, OnInit } from '@angular/core';
import { PeticionesService } from 'src/app/services/requests/peticiones.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {

  publicaciones:any = []
  
  constructor(private service:PeticionesService) { }

  ngOnInit(): void {
    this.obtenerPublicaciones()
  }

  obtenerPublicaciones(){
    this.service.peticionGet("http://localhost:8000/api/blog/list_publicacion/",true).subscribe(res=>{
      this.publicaciones = res
    },err=>{
      alert(err.error.error)
    })
  }

  modificarPost(id:any){

  }

  eliminarPost(id:any){
    if (confirm("¿Seguro que deseas eliminar la publicación?")){
      this.service.peticionDelete("http://localhost:8000/api/blog/publicacion/"+id).subscribe(res=>{
      alert(res.msg)
      window.location.reload()
    },err=>{
      alert(err.error.error)
    })
    }
    
  }

}
