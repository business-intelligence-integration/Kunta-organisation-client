import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Organism } from 'src/app/core/classes/organism';
import { Post } from 'src/app/core/classes/post';
import { User } from 'src/app/core/classes/user';
import { AreaService } from 'src/app/core/services/areas/area.service';
import { CenterService } from 'src/app/core/services/centers/center.service';
import { FonctionService } from 'src/app/core/services/fonction/fonction.service';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-centers',
  templateUrl: './centers.component.html',
  styleUrls: ['./centers.component.scss']
})
export class CentersComponent implements OnInit {
  show: boolean = false;
  ngSelect = 0;
  ngSelectArea = 0;
  openUpdateCenter: string = "";
  openAddCenter: string = "";
  createDate: string = "";
  center: Organism;
  addCenterForm!: FormGroup
  updateCenterForm!: FormGroup;
  addAreaForm!: FormGroup;
  searchForm!: FormGroup;
  centers: Organism[] = [];
  newListcenters: Organism[] = [];
  countCenter: number = 0;
  openAreaModal: string = "";
  areas: Organism[] = [];
  clubs: Organism[] = [];
  members: User[] = [];
  area: Organism;
  idCenter: number = 0;
  isSaving:boolean = false;
  maxCreationAreaDate: any;
  constructor(private formBuilder: FormBuilder,
    private centerService: CenterService,
    private areaService: AreaService,
    private loaderService: LoaderService,
    private utilityService: UtilityService) { 
      this.center = new Organism();
      this.area = new Organism();
    }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.getAllCenters();
    this.formInit();
    this.getAllArea();
    this.getMaxCreationaDate();
   
  }

  formInit() {
    this.addCenterForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      reference: new FormControl(null, Validators.required),
      creationDate: new FormControl(null, Validators.required),
      observation: new FormControl(null, Validators.required),
    })

    this.updateCenterForm = this.formBuilder.group({
      id: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      reference: new FormControl(null, Validators.required),
      observation: new FormControl(null, Validators.required),
    })

    this.addAreaForm = this.formBuilder.group({
      idArea: new FormControl(null, Validators.required),
    })

    this.searchForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required)
    })
  }  

  getAllCenters(){
    let tabCenter: Organism[]= [];
    let areas:Organism[] = []
    let area:Organism
    this.centerService.findAllCenters()
    .subscribe({
      next: (res) => res.data.map((center: any) => {
        let clubs:Organism[] = []
        let members: User[] = [];
        let uniqCenter: Organism;
        let newareas: Organism[] = center.areas
        if(newareas.length > 0){
          newareas.forEach((area:any)=>{
              let newclubs: Organism[] = area.clubs
              if(newclubs.length >0){
                newclubs.forEach((club:any)=>{
                  let newmembers: User[] = club.members
                  if(newmembers.length > 0){
                    newmembers.forEach((member:any)=>{
                      members.push(member)
                    }) 
                  }
                  clubs.push(club)
              })}  
              areas.push(area)
            })
        }
        uniqCenter = { ...center, clubs, members}
        tabCenter.push(uniqCenter);
        if ( res == null ) {
          this.show = true;
          this.loaderService.hideLoader();
        } else {
          if( tabCenter.length <= 0 ) {
            this.show = true;
            this.loaderService.hideLoader();
          } else {
            this.show = false;
            this.loaderService.hideLoader();
          }
        }
      }),
    });
    this.newListcenters = tabCenter;
    this.loaderService.hideLoader();
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
         title: 'Êtes-vous sûre ?',
         text: "Cette action est irreversible!",
         icon: 'warning',
         showCancelButton: true,
         confirmButtonText: 'Oui, supprimer!',
         cancelButtonText: 'Non, annuler!',
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
                 title: 'Supprimé !',
                 text: 'Le centre a été supprimé!',
                 confirmButtonColor: '#198AE3',
               });
             },
             () => {
               swalWithBootstrapButtons.fire({
                 title: 'Annulé',
                 text: 'Une erreur s\'est produite',
                 confirmButtonColor: '#d33',
               });
             }
           );
         } else if (result.dismiss === Swal.DismissReason.cancel) {
           swalWithBootstrapButtons.fire({
             title: 'Annulé',
             text: 'Vous avez annulé la suppression',
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
    this.center.reference = formValue.reference;
    this.center.observation = formValue.observation;
    this.createCenter(this.center)
    this.addCenterForm.reset();
  }

  createCenter(center: Organism){
    this.isSaving = true;
    this.centerService.createCenter(center).subscribe((res)=>{
      this.isSaving = false;
      if(res) {
        if (res.data == null ) {
          this.utilityService.showMessage(
            'warning',
            res.message,
            '#e62965',
            'white'
          );
        } else {
          this.center = res.data;
          this.onCloseAddModal();
          this.getAllCenters();
          this.addCenterForm.reset();
          this.utilityService.showMessage(
            'success',
            'Centre crée avec succès !',
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
    }, (error)=>{
      console.log(error);
      this.isSaving = false;
    })
  }

  onCloseUpdateModale(){
    this.openUpdateCenter = ""
  }

  onSubmitUpdateCenter(){
    const formValue = this.updateCenterForm.value;
    this.center.name = formValue.name;
    this.center.reference = formValue.reference;
    this.center.observation = formValue.observation;
    this.updateCenter(this.center, formValue.id);
  }

  updateCenter(center: Organism, id: number){
    this.isSaving = true;
    this.centerService.updateCenterById(center, id).subscribe((res)=>{
      this.isSaving = false;
      if(res) {
        if (res.data == null ) {
          this.utilityService.showMessage(
            'warning',
            res.message,
            '#e62965',
            'white'
          );
        } else {
          this.getAllCenters();
          this.onCloseUpdateModale();
          this.utilityService.showMessage(
            'success',
            'Centre mis à jour avec succès !',
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
    }, (error)=>{
      this.isSaving = false;
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
    this.centerService.addAreaToCenter(this.idCenter, formValue.idArea).subscribe((res)=>{
      if(res) {
        if (res.data == null ) {
          this.utilityService.showMessage(
            'warning',
            res.message,
            '#e62965',
            'white'
          );
        } else {
          this.getAllCenters();
          this.closeAreaModal();
          this.addAreaForm.reset();
          this.utilityService.showMessage(
            'success',
            'Zone ajoutée au Centre avec succès !',
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
      
    }, (error)=>{
      console.log(error);
      
      this.isSaving = false;
      this.utilityService.showMessage(
        'warning',
        'Une erreur s\'est produite',
        '#e62965',
        'white'
      );
    })
  }

  onSelectCreateDate(event: any){

  }
  getMaxCreationaDate(){
    this.maxCreationAreaDate = new DatePipe('en-US').transform(new Date(Date.now()),'yyyy-MM-dd');
  }
  
  searchCenters(){
    this.findCentersByName(this.searchForm.value.name);
  }

  findCentersByName(name: string){
    this.centerService.findCentersByName(name).subscribe((res)=>{
      this.newListcenters = [];
      this.newListcenters = res?.data;
    })
  }
}
