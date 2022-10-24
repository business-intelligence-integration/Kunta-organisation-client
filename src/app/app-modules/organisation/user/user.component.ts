import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  openAddModal: string = "";
  addUserForm!: FormGroup;


  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.addUserForm = this.formBuilder.group({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
      userName: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      confPassword: new FormControl(null, Validators.required),
    })
  }

  onAddUser(){
   this.openAddModal = "is-active"
  }

  closeUserModal(){
    this.openAddModal = ""
  }

}
