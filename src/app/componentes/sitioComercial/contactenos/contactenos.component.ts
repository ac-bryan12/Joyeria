import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-contactenos',
  templateUrl: './contactenos.component.html',
  styleUrls: ['./contactenos.component.css']
})
export class ContactenosComponent implements OnInit {

  public contactoForm: FormGroup;
  constructor(private fb:FormBuilder) {
    this.contactoForm = this.fb.group({
      names: this.fb.control('',[Validators.required, Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$'), Validators.maxLength(150)]),
      phone: this.fb.control('',[Validators.required, Validators.pattern('^[+_0-9]+$'), Validators.minLength(10)]),
      email: this.fb.control('',[Validators.required, Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9._%+\-]+@[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9.\-]+\\.[a-zA-ZñÑáéíóúÁÉÍÓÚ]{2,4}'), Validators.minLength(7),Validators.maxLength(150)]),
      born_date: this.fb.control(new Date()),
      city: this.fb.control('', [Validators.required, Validators.pattern('^[a-zA-Z ]+$'), Validators.minLength(4), Validators.maxLength(35)]),
      topic:this.fb.control('',[Validators.required, Validators.minLength(10), Validators.maxLength(50)]),
      detail:this.fb.control('',[Validators.required, Validators.minLength(10), Validators.maxLength(250)])
    })
   }

  ngOnInit(): void {
  }

}
