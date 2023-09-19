import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/classes/user';
import { UserService } from 'src/app/core/services/users/user.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import {Location} from "@angular/common";

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  ngSelectCivility = 0;
  ngSelectFamilySituation = 0;
  ngSelectTypePiece1 = 0;
  ngSelectTypePiece2 = 0;
  user: User;
  userId: number = 0;
  updateUserForm!: FormGroup;
  isSaving: boolean = false;
  showErroMessage: boolean = false;
  birthDate: any;
  dateOfValidity: any;
  dateOfIssue: any;
  dateNow: any;
  imageUrl: string = "https://res.cloudinary.com/b2i-group/image/upload/v1673430409/kunta-organisation/images/t%C3%A9l%C3%A9chargement_vojsxd.png";
  
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

  initDates(){
    this.dateNow = new DatePipe('en-US').transform(new Date(Date.now()),'yyyy-MM-dd');
  }

  formInit() {
    this.updateUserForm = this.formBuilder.group({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      userName: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      id: new FormControl(null, Validators.required),
      dateOfIssue: new FormControl(null, Validators.required),
      dateOfValidity: new FormControl(null, Validators.required),
      mainAddress: new FormControl(null, Validators.required),
      nationalIDNumber: new FormControl(null, Validators.required),
      nationality: new FormControl(null, Validators.required),
      numberOfChildren: new FormControl(null, Validators.required),
      pieceId: new FormControl(null, Validators.required),
      placeOfIssue: new FormControl(null, Validators.required),
      postalBox: new FormControl(null, Validators.required),
      secondPhoneNumber: new FormControl(null),
      secondaryAddress: new FormControl(null),
      secondaryEmail: new FormControl(null),
      whatsappPhoneNumber:new FormControl(null, Validators.required),
    })
  }

  comeBack(){this.location.back()}

  getConnectedUser() {
    this.userService.getUserByEmail(this.utilityService.getUserName()).subscribe((res) => {
      this.user = res.data;
      this.userId = res.data.id;
    })
  }

  onSelectCreateDate(event: any){

  }

  onSubmitUpdateUser(){
    this.isSaving = true;
    const formValue = this.updateUserForm.value;
    this.user.firstName = formValue.firstName;
    this.user.lastName = formValue.lastName;
    this.user.email = formValue.userName;
    this.user.phoneNumber = formValue.phoneNumber;
    this.user.userName = formValue.userName
    this.user.city = formValue.city;
    this.user.dateOfIssue = formValue.dateOfIssue;
    this.user.dateOfValidity = formValue.dateOfValidity;
    this.user.mainAddress = formValue.mainAddress;
    this.user.nationalIDNumber = formValue.nationalIDNumber;
    this.user.nationality = formValue.nationality;
    this.user.numberOfChildren = formValue.numberOfChildren;
    this.user.pieceId = formValue.pieceId;
    this.user.placeOfIssue = formValue.placeOfIssue;
    this.user.postalBox = formValue.postalBox;
    this.user.secondPhoneNumber = formValue.secondPhoneNumber;
    this.user.secondaryAddress = formValue.secondaryAddress;
    this.user.secondaryEmail = formValue.secondaryEmail;
    this.user.whatsappPhoneNumber = formValue.whatsappPhoneNumber;

    this.updateUser(this.user, this.userId)
  }

  updateUser(user: User, id: number){
    this.userService.updateMemberById(user, id).subscribe((res)=>{
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
          this.utilityService.showMessage(
            'success',
            'Utilisateur mis à jour avec succès !',
            '#06d6a0',
            'white'
          );
        }
      } else {
        this.utilityService.showMessage(
          'warning',
          'Une erreur s\'est produite',
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
