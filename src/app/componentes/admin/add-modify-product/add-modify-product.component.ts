import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PeticionesService } from 'src/app/services/requests/peticiones.service';

@Component({
  selector: 'app-add-modify-product',
  templateUrl: './add-modify-product.component.html',
  styleUrls: ['./add-modify-product.component.css']
})
export class AddModifyProductComponent implements OnInit {

  public product_form: FormGroup;

  constructor(private router: Router,private service: PeticionesService,private form: FormBuilder) {
    this.product_form = this.form.group({
      nombre: this.form.control('', [Validators.required, Validators.maxLength(255)]),
      categoria: this.form.control(''),
      precio: this.form.control('',[Validators.required,Validators.pattern('^[0-9]+([.][0-9]+)?$'),Validators.maxLength(12)]),
      promocion: this.form.control('',[Validators.required,Validators.pattern('^[0-9]+([.][0-9]+)?$'),Validators.maxLength(12)]),
      url_image: this.form.control('',[Validators.required,Validators.maxLength(1024)])
    })
   }

  ngOnInit(): void {
  }

  enviar(){

  }

}
