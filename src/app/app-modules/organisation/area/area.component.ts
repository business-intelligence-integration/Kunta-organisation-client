import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Organism } from 'src/app/core/classes/organism';
import { AreaService } from 'src/app/core/services/areas/area.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {
  openAddArea: string = "";
  addAreaForm!: FormGroup;
  areas: Organism[] = [];
  area: Organism;

  constructor(private formBuilder: FormBuilder,
    private areaService: AreaService,
    private utilityService: UtilityService) { 
      this.area = new Organism();
    }

  ngOnInit(): void {
    this.formInit();
    this.getAllAreas();
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
    const formValue = this.addAreaForm.value;
    this.area.name = formValue.name;
    this.areaService.createArea(this.area).subscribe((res)=>{
      this.onCloseAddModal();
      this.getAllAreas();
      this.utilityService.showMessage(
        'success',
        'Area successfully created',
        '#06d6a0',
        'white'
      );
    }, (error)=>{
      console.log(error);
      
    })
  }

  getAllAreas(){
    this.areaService.findAllAreas().subscribe((res)=>{
      this.areas = res.data;
    })
  }

  onUpdateArea(id: number){

  }

  onDeleteArea(id: number){
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
          this.areaService.deleteAreaById(id).subscribe(
            () => {
              this.getAllAreas();
              swalWithBootstrapButtons.fire({
                title: 'Deleted !',
                text: 'Area has been deleted.',
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
