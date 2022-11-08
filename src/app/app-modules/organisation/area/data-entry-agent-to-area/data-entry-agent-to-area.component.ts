import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/classes/user';
import { AreaService } from 'src/app/core/services/areas/area.service';
import { UserService } from 'src/app/core/services/users/user.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';

@Component({
  selector: 'app-data-entry-agent-to-area',
  templateUrl: './data-entry-agent-to-area.component.html',
  styleUrls: ['./data-entry-agent-to-area.component.scss']
})
export class DataEntryAgentToAreaComponent implements OnInit {

  ngSelect = 0;
  entryAgent: User;
  openAgentModal: string = "";
  addAgentForm!: FormGroup;
  users: User[] = [];
  idArea: number = 0;
  constructor( private activatedRoute: ActivatedRoute, 
    private areaService: AreaService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private utilityService: UtilityService,) {
    this.entryAgent = new User();
   }

  ngOnInit(): void {
    this.getArea();
    this.formInit();
    this.getAllUser();
  }

  formInit() {
    this.addAgentForm = this.formBuilder.group({
      id: new FormControl(null, Validators.required),
    })

  }

  getArea(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.areaService.getAreaById(params['id']).subscribe((res)=>{
        this.idArea = res.data.id;
        this.entryAgent = res.data.dataEntryAgent;
        console.log("res::", res);
        
      });
    })
  }

  getAllUser(){
    this.userService.getAllUsers().subscribe((res)=>{
      this.users = res.data
    })
  }

  onAddAgent(){
    const formValue  = this.addAgentForm.value;
    this.addAgent(this.idArea, formValue.id)
  }

  addAgent(idArea: number, idAgent: number){
    this.areaService.addDataEntryAgentToArea(idArea, idAgent).subscribe(()=>{
      this.getArea();
      this.closeAgentModal();
      this.utilityService.showMessage(
        'success',
        'Member successfully added',
        '#06d6a0',
        'white'
      );
    },()=>{
      this.utilityService.showMessage(
        'warning',
        'An error has occurred',
        '#e62965',
        'white'
      );
    })
  }

  onAddAgentEntry(){
    this.openAgentModal = "is-active"
    
  }

  closeAgentModal(){
    this.openAgentModal = "";
  }

  onDeleteEntryAgent(id: number){

  }

}
