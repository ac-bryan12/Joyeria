import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

    })
   }

  ngOnInit(): void {
  }

  enviar(values:any){
  }

}
