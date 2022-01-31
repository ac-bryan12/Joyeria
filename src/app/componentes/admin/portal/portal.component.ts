import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PeticionesService } from 'src/app/services/requests/peticiones.service';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {
  admin=false
  cliente =false

  constructor(private service:PeticionesService,private router:Router) { }

  ngOnInit(): void {
    document.getElementsByTagName('navbar')[0].classList.toggle("d-none")
    this.verificarGrupo()
  }

  logout(){
    this.service.peticionGet("http://localhost:8000/auth/logout/",true).subscribe(res=>{
      window.location.replace("http://localhost:4200/")
    },err=>{})
  }

  colapsar(){
    console.log("clic")
    let nav:any = document.querySelector("#main-container nav")
    nav.classList.toggle("nav-hidden")
  }

  submenu(submenu:any,icon:any){
    submenu.classList.toggle("d-none")
    icon.classList.toggle('rotate-icon')
  }


  verificarGrupo(){
    this.service.peticionGet("http://localhost:8000/auth/user_credentials/",true).subscribe(res=>{
      if(res.group=="admin"){
        this.admin = true
      }
      else{
        this.cliente =true
      }
    })
  }

}
