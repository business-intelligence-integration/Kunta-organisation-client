import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Organism } from 'src/app/core/classes/organism';
import { MainOfficeService } from 'src/app/core/services/main-offices/main-office.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main-office',
  templateUrl: './main-office.component.html',
  styleUrls: ['./main-office.component.scss']
})
export class MainOfficeComponent implements OnInit {

  openAddMainOffice: string = "";
  addMainOfficeForm!: FormGroup
  mainOffices: Organism[] = [];
  mainOffice: Organism;
  constructor(private formBuilder: FormBuilder,  
    private mainofficeService: MainOfficeService,
    private utilityService: UtilityService) {
      this.mainOffice = new Organism();
     }

  ngOnInit(): void {
    this.formInit();
    this.getAllMainOffice();
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
    const formValue = this.addMainOfficeForm.value;
    this.mainOffice.name = formValue.name
    this.mainofficeService.createMainOffice(this.mainOffice).subscribe(()=>{
      this.getAllMainOffice();
      this.onCloseAddModal();
      this.addMainOfficeForm.reset();
      this.utilityService.showMessage(
        'success',
        'Main office successfully created',
        '#06d6a0',
        'white'
      );
    });
  }

  getAllMainOffice(){
    this.mainofficeService.findAllOffices().subscribe((res)=>{
      this.mainOffices = res.data;
      console.log(this.mainOffices);
      
    })
  }

  onUpdateMainOffice(id: number){

  }

  onDeleteMainOffice(id: number){
    this.deleteMessage(id);
  }

  deleteMessage(id: number) {
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
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        confirmButtonColor: '#198AE3',
        cancelButtonColor: '#d33',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.mainofficeService.deleteMainOffice(id).subscribe(
            () => {
              this.getAllMainOffice();
              swalWithBootstrapButtons.fire({
                title: 'Deleted !',
                text: 'Main Office has been deleted.',
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
