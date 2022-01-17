import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PeticionesService } from 'src/app/services/requests/peticiones.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public login: FormGroup;
  msg_d = "d-none"
  msg_content = ""

  constructor(private log: FormBuilder, private service: PeticionesService,private router: Router,private cookieService: CookieService) {

    this.login = this.log.group({
      email: this.log.control('', [Validators.required, Validators.pattern('^[a-z0-9._%+\-]+@[a-z0-9.\-]+\\.[a-z]{2,4}'), Validators.minLength(7)]),
      password: this.log.control('', [Validators.required, Validators.minLength(8)])
    })
  }

  ngOnInit(): void {
  }

  log_in(){
    this.service.peticionPost("http://localhost:8000/auth/login/",this.login.value).subscribe(res=>{
      this.cookieService.set("token",res.token)
      this.router.navigate(["/portal"])
    },err=>{
      this.msg_d = ""
      this.msg_content = err.error.error;
    })
  }
}
