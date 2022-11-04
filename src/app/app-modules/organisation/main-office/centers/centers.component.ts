import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Organism } from 'src/app/core/classes/organism';
import { AreaService } from 'src/app/core/services/areas/area.service';
import { CenterService } from 'src/app/core/services/centers/center.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-centers',
  templateUrl: './centers.component.html',
  styleUrls: ['./centers.component.scss']
})
export class CentersComponent implements OnInit {
  ngSelect = 0;
  openUpdateCenter: string = "";
  openAddCenter: string = "";
  center: Organism;
  addCenterForm!: FormGroup
  updateCenterForm!: FormGroup;
  addAreaForm!: FormGroup;
  centers: Organism[] = [];
  countCenter: number = 0;
  openAreaModal: string = "";
  areas: Organism[] = [];
  idCenter: number = 0;
  constructor(private formBuilder: FormBuilder,
    private centerService: CenterService,
    private areaService: AreaService,
    private utilityService: UtilityService,) { 
      this.center = new Organism();
    }

  ngOnInit(): void {
    this.getAllCenters();
    this.formInit();
    this.getAllArea();
  }

  formInit() {
    this.addCenterForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
    })

    this.updateCenterForm = this.formBuilder.group({
      id: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
    })

    this.addAreaForm = this.formBuilder.group({
      id: new FormControl(null, Validators.required),
    })
  }  
  getAllCenters(){
    this.centerService.findAllCenters().subscribe((result)=>{
      console.log("results::", result);
      this.centers = result.data
    })
  }

  getAllArea(){
    this.areaService.findAllAreas().subscribe((res)=>{
      this.areas = res.data
    })
  }
  onUpdateCenter(idCenter: number){
    this.getCenterById(idCenter);
  }

  getCenterById(id: number){
    this.centerService.getCenterById(id).subscribe((res)=>{
      this.center = res.data;
      this.openUpdateCenter = "is-active";
    })
  }


  onDeleteCenter(idCenter: number){
    this.deleteMessage(idCenter);
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
           this.centerService.deleteCenterById(id).subscribe(
             () => {
               this.getAllCenters();
               swalWithBootstrapButtons.fire({
                 title: 'Deleted !',
                 text: 'Center has been deleted.',
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

   onAddCenter(){
    this.openAddCenter = "is-active";
  }

  onCloseAddModal(){
    this.openAddCenter = "";
  }
 
  onSubmitCenter(){
    const formValue = this.addCenterForm.value;
    this.center.name = formValue.name;
    this.createCenter(this.center)
    this.addCenterForm.reset();
  }

  createCenter(center: Organism){
    this.centerService.createCenter(center).subscribe((res)=>{
      this.center = res.data
      this.onCloseAddModal();
      this.getAllCenters();
      this.addCenterForm.reset();
      this.utilityService.showMessage(
        'success',
        'Center successfully created',
        '#06d6a0',
        'white'
      );
    }, (error)=>{
      console.log(error);
      
    })
  }

  onCloseUpdateModale(){
    this.openUpdateCenter = ""
  }

  onSubmitUpdateCenter(){
    const formValue = this.updateCenterForm.value;
    this.center.name = formValue.name;
    this.updateCenter(this.center, formValue.id);
  }

  updateCenter(center: Organism, id: number){
    this.centerService.updateCenterById(center, id).subscribe(()=>{
      this.getAllCenters();
      this.onCloseUpdateModale();
      this.utilityService.showMessage(
        'success',
        'Center successfully updated',
        '#06d6a0',
        'white'
      );
    }, (error)=>{
      console.log(error);
      this.getCenterById(id);
    })
  }


  onAddArea(idCenter: number){
    this.idCenter = idCenter;
    this.openAreaModal = "is-active";
  }

  closeAreaModal(){
    this.openAreaModal = "";
  }

  onSubmitArea(){
    const formValue = this.addAreaForm.value;
    this.addArea(this.idCenter, formValue.id)
  }

  addArea(idCenter: number, idArea: number){
    this.centerService.addAreaToCenter(idCenter, idArea).subscribe(()=>{
      this.getAllCenters();
      this.closeAreaModal();
      this.utilityService.showMessage(
        'success',
        'Area successfully added to center',
        '#06d6a0',
        'white'
      );
    })
  }
}
