import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/core/classes/login';
import { AuthentificationService } from 'src/app/core/services/authentification/authentification.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signInForm!: FormGroup
  login: Login;
  isNotLogin: boolean = false;
  isProgressing: boolean = false;

  visible:boolean = true;
  changetype:boolean =true;
  
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private authentificationSerice: AuthentificationService,
    private utilityService: UtilityService) {
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



  viewpass(){
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  onSignIn(){
    const formValue = this.signInForm.value;
    this.login.email = formValue.email;
    this.login.password = formValue.password;
    this.isProgressing = true;
    this.authentificationSerice.signin(this.login).subscribe((result: any)=>{
      if(result.status == "OK"){
        this.utilityService.saveToken(result.data);
        this.router.navigateByUrl('dashboards');
        this.isNotLogin = false;
        this.isProgressing = false
      }else{
        this.utilityService.deleteToken();
        this.isNotLogin = true;
        this.isProgressing = false
      }
    }, ()=>{
      this.utilityService.deleteToken();
      this.isNotLogin = true;
      this.isProgressing = false
    })
  }


}
