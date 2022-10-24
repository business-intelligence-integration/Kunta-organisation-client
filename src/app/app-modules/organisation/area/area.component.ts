import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {
  openAddArea: string = "";
  addAreaForm!: FormGroup

  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.addAreaForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
    })
  }

  onAddArea(){
    this.openAddArea = "is-active";
  }

  onCloseAddModal(){
    this.openAddArea = "";
  }

  onSubmitArea(){

  }

}
