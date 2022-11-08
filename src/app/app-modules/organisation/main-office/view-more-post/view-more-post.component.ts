import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Organism } from 'src/app/core/classes/organism';
import { CenterService } from 'src/app/core/services/centers/center.service';
import { MainOfficeService } from 'src/app/core/services/main-offices/main-office.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-more-post',
  templateUrl: './view-more-post.component.html',
  styleUrls: ['./view-more-post.component.scss']
})
export class ViewMorePostComponent implements OnInit {
  ngSelect = 0;
  mainOffice: Organism
  activeRightMenu: string = "";
  activeToggle: string = "";
  homeSider: string = "";
  isPushed: string = "";
  openAddCenter: string = "";
  openUpdateCenter: string = "";
  addCenterForm!: FormGroup;
  updateCenterForm!: FormGroup;
  centersOfMainOffice: Organism[] = [];
  centers: Organism[] = [];
  center: Organism;
  idMainOffice: number = 0;


  constructor(private mainOfficeService: MainOfficeService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private centerService: CenterService,
    private utilityService: UtilityService,) {
    this.mainOffice = new Organism();
    this.center = new Organism();
   }

  ngOnInit(): void {
    this.getMainOffice();
    this.getAllCenters();
    this.formInit();
  }

  formInit() {
    this.addCenterForm = this.formBuilder.group({
      id: new FormControl(null, Validators.required),
    })

    this.updateCenterForm = this.formBuilder.group({
      id: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
    })
  }
  getMainOffice(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.mainOfficeService.getById(params['id']).subscribe((res)=>{
        this.mainOffice = res;
        this.centersOfMainOffice = res.data.centers;
        this.idMainOffice = res.data.id;
      });
    })
  }

  activeHomeSider() {
    if (this.activeToggle == "") {
      this.activeToggle = "active";
      this.homeSider = "is-active";
      this.isPushed = "is-pushed-full";
    } else {
      this.activeToggle = "";
      this.homeSider = "";
      this.isPushed = "";
    }

  }

  onUpdateCenter(id: number){
    console.log("id::", id);
    this.centerService.getCenterById(id).subscribe((res)=>{
      this.openUpdateCenter ="is-active";
      this.center = res.data;      
    })
  }

  onDeleteCenter(id: number){
    this.deleteMessage(this.idMainOffice, id);
  }

  onOpenAddCenter(){
    this.openAddCenter = "is-active"
  }

  onCloseAddModal(){
    this.openAddCenter = ""
  }

  onSubmitCenter(){
    const formValue = this.addCenterForm.value;
    this.addCenterToMainOffice(this.idMainOffice, formValue.id)
  }

  addCenterToMainOffice(idMainOffice: number, idCenter: number){
    this.mainOfficeService.addCenterToMainOffice(idMainOffice, idCenter).subscribe(()=>{
      this.getMainOffice();
      this.onCloseAddModal();
      this.utilityService.showMessage(
        'success',
        'Center successfully added to main office',
        '#06d6a0',
        'white'
      );
    })
  }

  getAllCenters(){
    this.centerService.findAllCenters().subscribe((res)=>{
      this.centers = res.data;   
    })
  }

  deleteMessage(idMainOffice: number, idCenter: number) {
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
          this.mainOfficeService.removeCenterFromMainOffice(idMainOffice, idCenter).subscribe(
            () => {
              this.getMainOffice();
              swalWithBootstrapButtons.fire({
                title: 'Removed !',
                text: 'Center has been moved from main office.',
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
            text: 'you have cancelled the remiving',
            confirmButtonColor: '#d33',
          });
        }
      });
  }

  onSubmitUpdateCenter(){
    const formValue =  this.updateCenterForm.value;
    this.center.name = formValue.name;
    this.updateCenter(this.center, formValue.id)
  }

  updateCenter(center: Organism, id: number){
    this.centerService.updateCenterById(this.center, id).subscribe(()=>{
      this.getMainOffice();
      this.onCloseUpdateModal();
      this.utilityService.showMessage(
        'success',
        'Center of main office successfully updated',
        '#06d6a0',
        'white'
      );
    })
  }

  onCloseUpdateModal(){
    this.openUpdateCenter = ""
  }
}
