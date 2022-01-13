import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeticionesService} from 'src/app/services/requests/peticiones.service';

@Component({
  selector: 'create-cuenta',
  templateUrl: './create-cuenta.component.html',
  styleUrls: ['./create-cuenta.component.css']
})
export class CreateCuentaComponent implements OnInit {

  public createAccount: FormGroup;
  constructor(
    private fb: FormBuilder,
    private envio: PeticionesService) {
    this.createAccount = this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$'),Validators.minLength(3)]),
      email: this.fb.control('', [Validators.required,Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9._%+\-]+@[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9.\-]+\\.[a-zA-ZñÑáéíóúÁÉÍÓÚ]{2,4}'),Validators.minLength(7)]),
      password: this.fb.control('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[_.{}=<>;:,\+$@$!%*?&])[A-Za-z\d_.{}=<>;:,\+$@$!%*?&].{7,}')]),
      confpassword: this.fb.control('', [Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[_.{}=<>;:,\+$@$!%*?&])[A-Za-z\d_.{}=<>;:,\+$@$!%*?&].{7,}')]),
      direccion: this.fb.control('', [Validators.required,Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9._ ]+$')]),
      telefono: this.fb.control('', [Validators.required,Validators.pattern('^[0-9]+$'),Validators.minLength(10)])
    })
   }

  ngOnInit(): void {
  }

  enviar(values:any){
  }

}
