import { Component, OnInit } from '@angular/core';
import { Editor, toHTML } from 'ngx-editor';
import { PeticionesService } from 'src/app/services/requests/peticiones.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {
  editor: Editor;
  html = "";

  public newPost: FormGroup;


  constructor(private service: PeticionesService,private post: FormBuilder) {
    this.editor = new Editor();
    this.newPost = post.group({
      titulo: this.post.control("",[Validators.required]),
      descripcion: this.post.control("",[Validators.required]),
      autor: this.post.control("",[Validators.required]),
      img_portada: this.post.control("",[Validators.required])
    })
   }

  ngOnInit(): void {
    // this.editor = new Editor();
  }

  guardar(){
    this.newPost.value["contenido"] = btoa(this.editor.view.dom.innerHTML)
    this.service.peticionPost("http://localhost:8000/api/blog/publicacion/",this.newPost.value,true)
    .subscribe(res =>{
      alert(res.msg)
    },err=>{
      alert(err.error.error)
    })
  }

}
