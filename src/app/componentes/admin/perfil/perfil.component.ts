import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PeticionesService } from 'src/app/services/requests/peticiones.service';

@Component({
  selector: 'perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  public profile: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: PeticionesService) {
    this.profile = this.fb.group({
      first_name: this.fb.control('', [Validators.required, Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$')]),
      last_name: this.fb.control('', [Validators.required, Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$')]),
      email: this.fb.control('', [Validators.required, Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9._%+\-]+@[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9.\-]+\\.[a-zA-ZñÑáéíóúÁÉÍÓÚ]{2,4}'), Validators.minLength(7)]),
      direccion: this.fb.control('', [Validators.required, Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9._ ]+$')]),
      telefono: this.fb.control('', [Validators.required, Validators.pattern('^[0-9]+$')])
    })
  }

  ngOnInit(): void {
    this.obtenerDatos()
  }

  obtenerDatos() {
    this.service.peticionGet("http://localhost:8000/api/user/", true).subscribe(res => {
      let profile = res
      this.profile.get(["first_name"])?.setValue(profile.first_name)
      this.profile.get(["last_name"])?.setValue(profile.last_name)
      this.profile.get(["email"])?.setValue(profile.email)
      this.profile.get(["direccion"])?.setValue(profile.direccion)
      this.profile.get(["telefono"])?.setValue(profile.telefono)
    })

  }
  eliminarCuenta() {
    if (confirm("Desea eliminar el usuario")) {
      this.service.peticionDelete("http://localhost:8000/api/user/").subscribe(res => {
        alert(res.msg)
        this.router.navigate(['/login'])
      },
        er => {
          alert(er.error.error)
        })
    }
  }

  actualizarDatos(value: any) {
    this.service.peticionPut("http://localhost:8000/api/user/", value).subscribe(res => {
      alert(res.msg)
      window.location.reload()
    },
      error => {
        alert(error.error.error)
      })
  }


}
