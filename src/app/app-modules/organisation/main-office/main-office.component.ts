import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-main-office',
  templateUrl: './main-office.component.html',
  styleUrls: ['./main-office.component.scss']
})
export class MainOfficeComponent implements OnInit {

  openAddMainOffice: string = "";
  addMainOfficeForm!: FormGroup
  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.addMainOfficeForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
    })
  }

  onAddMainOffice(){
    this.openAddMainOffice = "is-active";
  }

  onCloseAddModal(){
    this.openAddMainOffice = "";
  }

  onSubmitMainOffice(){

  }


}
