import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/classes/user';
import { AuthentificationService } from 'src/app/core/services/authentification/authentification.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  signUpForm!: FormGroup
  user: User;


  constructor(private router: Router, 
    private formBuilder: FormBuilder,
    private authentificationSerice: AuthentificationService) {
    this.user = new User();
   }

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.signUpForm = this.formBuilder.group({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      userName: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      confPassword: new FormControl(null, Validators.required),
    })
  }

  onSignUp(){
    const formValue = this.signUpForm.value;
    this.user.firstName = formValue.firstName;
    this.user.lastName = formValue.lastName;
    this.user.email = formValue.userName;
    this.user.phoneNumber = formValue.phoneNumber;
    this.user.password = formValue.password;
    this.user.userName = formValue.userName;
    if(formValue.password != formValue.confPassword){
      alert("les mots de passe sont differents !")
    }else{
      this.authentificationSerice.signup(this.user).subscribe((user)=>{
        this.user = user;
        this.router.navigateByUrl('login');
      })
    }
  }

  sinUp(user: User){

  }
}
