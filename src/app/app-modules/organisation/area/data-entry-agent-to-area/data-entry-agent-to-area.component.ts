import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/classes/user';
import { AreaService } from 'src/app/core/services/areas/area.service';
import { UserService } from 'src/app/core/services/users/user.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';

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
  users: any;
  idArea: number = 0;
  agentEntryIsNull: boolean = true;
  isSaving: boolean = false;
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
        if(this.entryAgent == null || this.entryAgent == undefined){
          this.agentEntryIsNull = false;
        }else{
          this.agentEntryIsNull = true;
        }
        
      });
    })
  }

  getAllUser(){
    this.userService.getAllUsers().subscribe((res)=>{
      this.users = res.data.map((user:any)=>({value:user.id, label: user.firstName}));
    })
  }

  onAddAgent(){
    const formValue  = this.addAgentForm.value;
    this.addAgent(this.idArea, formValue.id)
  }

  addAgent(idArea: number, idAgent: number){
    this.isSaving = true;
    this.areaService.addDataEntryAgentToArea(idArea, idAgent).subscribe(()=>{
      this.isSaving = false;
      this.getArea();
      this.closeAgentModal();
      this.utilityService.showMessage(
        'success',
        'Member successfully added',
        '#06d6a0',
        'white'
      );
    },()=>{
      this.isSaving = false;
      this.utilityService.showMessage(
        'warning',
        'An error has occurred',
        '#e62965',
        'white'
      );
    })
  }

  onAddAgentEntry(){
    if(this.agentEntryIsNull == true){
      this.openAgentModal = ""
    }else{
      this.openAgentModal = "is-active"
    }
  }

  closeAgentModal(){
    this.openAgentModal = "";
  }

  onDeleteEntryAgent(){
    this.deleteMessage()
  }

  deleteMessage() {
    const swalWithBootstrapButtons = Swal.mixin({
      buttonsStyling: true,
    });
    swalWithBootstrapButtons
      .fire({
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp',
        },
        title: 'Are you sure ?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, remove it!',
        cancelButtonText: 'No, cancel!',
        confirmButtonColor: '#198AE3',
        cancelButtonColor: '#d33',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.areaService.removeDataEntryAgentFromArea(this.idArea).subscribe(
            () => {
              this.getArea();
              swalWithBootstrapButtons.fire({
                title: 'Removed !',
                text: 'Agent has been removed.',
                confirmButtonColor: '#198AE3',
              });
            },
            () => {
              swalWithBootstrapButtons.fire({
                title: 'Cancelled',
                text: 'An error has occurred',
                confirmButtonColor: '#d33',
              });
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: 'Cancelled',
            text: 'you have cancelled the deletion',
            confirmButtonColor: '#d33',
          });
        }
      });
  }

}
