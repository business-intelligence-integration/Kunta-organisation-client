import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Organism } from 'src/app/core/classes/organism';
import { Post } from 'src/app/core/classes/post';
import { CenterService } from 'src/app/core/services/centers/center.service';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { MainOfficeService } from 'src/app/core/services/main-offices/main-office.service';
import { PostService } from 'src/app/core/services/post/post.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-more-post',
  templateUrl: './view-more-post.component.html',
  styleUrls: ['./view-more-post.component.scss']
})
export class ViewMorePostComponent implements OnInit {
  show: boolean = false;
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
  posts: Post[] = [];
  center: Organism;
  idMainOffice: number = 0;


  constructor(private mainOfficeService: MainOfficeService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private centerService: CenterService,
    private utilityService: UtilityService,
    private loaderService: LoaderService,
    private postService: PostService) {
    this.mainOffice = new Organism();
    this.center = new Organism();
   }

  ngOnInit(): void {
    this.loaderService.showLoader();
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
        if ( res == null ) {
          this.show = true;
          this.loaderService.hideLoader();
        } else {
          this.centersOfMainOffice = res.data.centers;
          this.mainOffice = res;
          this.idMainOffice = res.data.id;
          if( this.centersOfMainOffice.length <= 0 ) {
            this.show = true;
            this.loaderService.hideLoader();
          } else {
            this.show = false;
            this.loaderService.hideLoader();
          }
        } 
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
    this.mainOfficeService.addCenterToMainOffice(idMainOffice, idCenter).subscribe((res)=>{
      if(res) {
        if (res.data == null ) {
          this.utilityService.showMessage(
            'warning',
            res.message,
            '#e62965',
            'white'
          );
        } else {
          this.getMainOffice();
          this.onCloseAddModal();
          this.utilityService.showMessage(
            'success',
            'Centre ajouté avec succès au Bureau Principal !',
            '#06d6a0',
            'white'
          );
        }
      } else {
        this.utilityService.showMessage(
          'warning',
          'Une erreur s\'est produite',
          '#e62965',
          'white'
        );
      }
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
        title: 'Êtes-vous sûre ?',
        text: "Cette action est irreversible!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, retirer!',
        cancelButtonText: 'Non, annuler!',
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
                title: 'Retiré !',
                text: 'Centre a été retiré du Bureau Principal.',
                confirmButtonColor: '#198AE3',
              });
            },
            () => {
              swalWithBootstrapButtons.fire({
                title: 'Annulé',
                text: 'Une erreur s\'est produite !',
                confirmButtonColor: '#d33',
              });
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: 'Annulé',
            text: 'Vous avez annulé le retrait',
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
    this.centerService.updateCenterById(this.center, id).subscribe((res)=>{
      if(res) {
        if (res.data == null ) {
          this.utilityService.showMessage(
            'warning',
            res.message,
            '#e62965',
            'white'
          );
        } else {
          this.getMainOffice();
          this.onCloseUpdateModal();
          this.utilityService.showMessage(
            'success',
            'Centre du Bureau Principal mis a jour avec succès !',
            '#06d6a0',
            'white'
          );
        }
      } else {
        this.utilityService.showMessage(
          'warning',
          'Une erreur s\'est produite',
          '#e62965',
          'white'
        );
      }
    })
  }

  onCloseUpdateModal(){
    this.openUpdateCenter = ""
  }
}
