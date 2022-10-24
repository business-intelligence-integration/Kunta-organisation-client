import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.scss']
})
export class CenterComponent implements OnInit {

  openAddCenter: string = "";
  addCenterForm!: FormGroup
  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.addCenterForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
    })
  }

  onAddCenter(){
    this.openAddCenter = "is-active";
  }

  onCloseAddModal(){
    this.openAddCenter = "";
  }

  onSubmitCenter(){

  }

}
