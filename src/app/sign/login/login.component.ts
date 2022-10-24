import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/core/classes/login';
import { AuthentificationService } from 'src/app/core/services/authentification/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signInForm!: FormGroup
  login: Login;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private authentificationSerice: AuthentificationService) {
    this.login = new Login();
   }

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.signInForm = this.formBuilder.group({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    })
  }

  onSignIn(){
    const formValue = this.signInForm.value;
    this.login.email = formValue.email;
    this.login.password = formValue.password;
    this.authentificationSerice.signin(this.login).subscribe((result: any)=>{
      if(result.status == "OK"){
        this.router.navigateByUrl('dashboards');
      }
      
    })
  }


}
