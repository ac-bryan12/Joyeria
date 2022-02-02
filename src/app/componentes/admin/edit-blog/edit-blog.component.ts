import { Component, OnInit } from '@angular/core';
import { Editor, toHTML } from 'ngx-editor';
import { PeticionesService } from 'src/app/services/requests/peticiones.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {
  editor: Editor;
  html = "";

  titulo = "Nuevo Post";
  id: any = null;

  public newPost: FormGroup;


  constructor(private service: PeticionesService,private post: FormBuilder,private router: Router,private route:ActivatedRoute) {
    this.editor = new Editor();
    this.newPost = post.group({
      titulo: this.post.control("",[Validators.required]),
      descripcion: this.post.control("",[Validators.required]),
      autor: this.post.control("",[Validators.required]),
      img_portada: this.post.control("",[Validators.required])
    })
   }

  ngOnInit(): void {
    this.cargarDatos()
  }

  cargarDatos(){
    this.id = this.router.parseUrl(this.router.url).queryParams["id"]
    if (this.id){
      this.titulo = "Editar Post"
      this.service.peticionGet("http://localhost:8000/api/blog/publicacion/"+this.id).subscribe(res=>{
        this.newPost.get(["titulo"])?.setValue(res.titulo)
        this.newPost.get(["descripcion"])?.setValue(res.descripcion)
        this.newPost.get(["autor"])?.setValue(res.autor)
        this.newPost.get(["img_portada"])?.setValue(res.img_portada)
        this.editor.view.dom.innerHTML = atob(res.contenido)
      },err=>{
        alert(err.error.error)
      })
    }
  }

  guardar(){
    this.newPost.value["contenido"] = btoa(this.editor.view.dom.innerHTML)
    if (this.id){
      this.service.peticionPut("http://localhost:8000/api/blog/publicacion/"+this.id,this.newPost.value)
      .subscribe(res =>{
        alert(res.msg)
        this.router.navigate(["../all_posts"],{relativeTo:this.route})
      },err=>{
        alert(err.error.error)
      })
    }else{
      this.service.peticionPost("http://localhost:8000/api/blog/publicacion/",this.newPost.value,true)
      .subscribe(res =>{
        alert(res.msg)
        this.router.navigate(["../all_posts"],{relativeTo:this.route})
      },err=>{
        alert(err.error.error)
      })
    }
  }

}
