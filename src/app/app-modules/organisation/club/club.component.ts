import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.scss']
})
export class ClubComponent implements OnInit {
  openAddClub: string = "";
  addClubForm!: FormGroup
  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.addClubForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
    })
  }

  onAddClub(){
    this.openAddClub = "is-active";
  }

  onCloseAddModal(){
    this.openAddClub = "";
  }

  onSubmitClub(){

  }

}
