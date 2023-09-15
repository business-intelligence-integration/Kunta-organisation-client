import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/classes/user';
import { UserService } from 'src/app/core/services/users/user.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import {Location} from "@angular/common";
import { UpdatePassword } from 'src/app/core/classes/updatePassword';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  user: User;
  userId: number = 0;
  newPass: string = "";
  confirmPass: string = "";
  updatePassword: UpdatePassword = new UpdatePassword();
  updatePasswordForm!: FormGroup;
  isSaving: boolean = false;
  isConfirmed: boolean = false;

  constructor( private utilityService: UtilityService,
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder,
    private userService: UserService) {
      this.user = new User();
    }

  ngOnInit(): void {
    this.getConnectedUser();
    this.formInit();
  }

  formInit() {
    this.updatePasswordForm = this.formBuilder.group({
      oldPassword: new FormControl(null, Validators.required),
      newPassword: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null),
    })
  }

  comeBack(){this.location.back()}

  getConnectedUser() {
    this.userService.getUserByEmail(this.utilityService.getUserName()).subscribe((res) => {
      this.user = res.data;
      this.userId = res.data.id;
    })
  }

  onNewPassSelected(val: any) {
    this.newPass = val;
    if( this.newPass === this.confirmPass ) {
      this.isConfirmed = true;
    } else {
      this.isConfirmed = false;
    }
  }

  onConfirmPassSelected(val: any) {
    this.confirmPass = val;
    if( this.confirmPass === this.newPass) {
      this.isConfirmed = true;
    } else {
      this.isConfirmed = false;
    }
  }

  onSubmitUpdatePassword(){
    this.isSaving = true;
    const formValue = this.updatePasswordForm.value;
    this.updatePassword.oldPassword = formValue.oldPassword;
    this.updatePassword.newPassword = formValue.newPassword;

    if(!this.isConfirmed) {
      this.utilityService.showMessage(
        'warning',
        'Le nouveau mot de passe n\'a pas été confirmé',
        '#e62965',
        'white'
      );
    } else {
      this.updatePass(this.updatePassword, this.userId);
    }
    
  }

  updatePass(updatePassword: UpdatePassword, idUser: number){
    this.userService.updatePassword(updatePassword, idUser).subscribe((res)=>{
      this.isSaving = false;
      if(res) {
        if (res.data == null ) {
          this.utilityService.showMessage(
            'warning',
            res.message,
            '#e62965',
            'white'
          );
        } else {
          this.getConnectedUser();
          this.updatePasswordForm.reset();
          this.utilityService.showMessage(
            'success',
            'Mot de passe mis à jour avec succès !',
            '#06d6a0',
            'white'
          );
        }
      } else {
        this.utilityService.showMessage(
          'warning',
          'Une erreur s\'est produite. Verifier votre saisie.',
          '#e62965',
          'white'
        );
      }
    }, ()=>{
      this.isSaving = false;
      this.utilityService.showMessage(
        'warning',
        'Une erreur s\'est produite !',
        '#e62965',
        'white'
      );
    })
  }


}
