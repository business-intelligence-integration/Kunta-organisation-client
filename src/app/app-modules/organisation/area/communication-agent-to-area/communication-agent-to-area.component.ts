import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/classes/user';
import { AreaService } from 'src/app/core/services/areas/area.service';
import { UserService } from 'src/app/core/services/users/user.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';

@Component({
  selector: 'app-communication-agent-to-area',
  templateUrl: './communication-agent-to-area.component.html',
  styleUrls: ['./communication-agent-to-area.component.scss']
})
export class CommunicationAgentToAreaComponent implements OnInit {
  ngSelect = 0;
  communicationAgent: User;
  openAgentModal: string = "";
  addAgentForm!: FormGroup;
  users: User[] = [];
  agentComunicationIsNull: boolean = false;
  idArea: number = 0;
  constructor( private activatedRoute: ActivatedRoute, 
    private areaService: AreaService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private utilityService: UtilityService,) {
    this.communicationAgent = new User();
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
        this.communicationAgent = res.data.communicationAgent;
        this.idArea = res.data.id;
        if(this.communicationAgent == null || this.communicationAgent == undefined){
          this.agentComunicationIsNull = true;
        }else{
          this.agentComunicationIsNull = false;
        }
        console.log(this.agentComunicationIsNull);
        
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
    this.areaService.addCommunicationAgentToArea(idArea, idAgent).subscribe(()=>{
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

  onAddAgentComunication(){
    if(this.agentComunicationIsNull = false){
      this.openAgentModal = ""
    }else{
      this.openAgentModal = "is-active"
    }
   
    
  }

  closeAgentModal(){
    this.openAgentModal = "";
  }

  onDeletecommunicationAgent(id: number){

  }
}
