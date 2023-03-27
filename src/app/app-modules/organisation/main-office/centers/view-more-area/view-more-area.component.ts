import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Organism } from 'src/app/core/classes/organism';
import { AreaService } from 'src/app/core/services/areas/area.service';
import { CenterService } from 'src/app/core/services/centers/center.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';
import {Location} from "@angular/common";

@Component({
  selector: 'app-view-more-area',
  templateUrl: './view-more-area.component.html',
  styleUrls: ['./view-more-area.component.scss']
})
export class ViewMoreAreaComponent implements OnInit {
  ngSelect = 0;
  activeRightMenu: string = "";
  activeToggle: string = "";
  homeSider: string = "";
  isPushed: string = "";
  openAreaModal: string = "";
  wrapdwonCenter: string ="display-block";
  addAreaForm!: FormGroup
  areas: Organism[] = [];
  areasOfCenter: Organism[] = [];
  idCenter: number = 0;
  isListAreas: boolean = true;
  isListPosts: boolean = false;
  centerName: string = "";
  dynamicTitle: string = "Liste des zones";

  isMemberGeneralAssembly: boolean = false;
  isAccountant: boolean = false;
  isAdminSys: boolean =  false;
  isDevelopmentCommitteeCenter: boolean = false;
  isGeneralAssemblyCenter: boolean = false;
  isExecutiveBoardCenter: boolean = false;
  isMemberToGcc: boolean = false;
  isProductionmanager: boolean = false;

  activeListCenter: string = "";

  constructor(private areaService: AreaService,
    private formBuilder: FormBuilder,
    private centerService: CenterService,
    private activatedRoute: ActivatedRoute,
    private utilityService: UtilityService,
    private location: Location) { }

  ngOnInit(): void {
    this.getAllArea();
    this.formInit();
    this.getCenter();
  }

  formInit() {
    this.addAreaForm = this.formBuilder.group({
      id: new FormControl(null, Validators.required),
    })
  }

  comeBack(){this.location.back()}

  getCenter(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.centerService.getCenterById(params['id']).subscribe((res)=>{
        this.areasOfCenter = res.data.areas;
        this.centerName = res.data.name
        this.idCenter = res.data.id
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

  onAddArea(){
    this.openAreaModal = "is-active"
  }

  closeAreaModal(){
    this.openAreaModal = ""
  }

  onSubmitArea(){
    const formValue = this.addAreaForm.value;
    this.addArea(this.idCenter, formValue.id)
  }

  addArea(idCenter: number, idArea: number){
    this.centerService.addAreaToCenter(idCenter, idArea).subscribe(()=>{
      this.getCenter();
      this.closeAreaModal();
      this.utilityService.showMessage(
        'success',
        'Zone ajoutée avec succès au Centre!',
        '#06d6a0',
        'white'
      );
    })
  }

  getAllArea(){
    this.areaService.findAllAreas().subscribe((res)=>{
      console.log("listArea::", res);
      
      this.areas = res.data
    })
  }

  onListCenter(){
    if(this.activeListCenter == ""){
      this.activeListCenter = "active" 
      this.wrapdwonCenter ="block"
    }else{
      this.activeListCenter =""
      this.wrapdwonCenter ="none"
    }
  }

  // onMemberGeneralAssembly(){
  //    this.isListAreas = false;
  //   this.isProductionmanager = false
  //   this.isMemberToGcc = false;
  //   this.isExecutiveBoardCenter = false;
  //   this.isGeneralAssemblyCenter = false;
  //   this.isDevelopmentCommitteeCenter = false;
  //   this.isAdminSys = false
  //   this.isAccountant = false;
  //   this.isMemberGeneralAssembly = true
  //   this.dynamicTitle = "Assemblée générale des membres";
  // }

  // onAccountant(){
  //    this.isListAreas = false;
  //   this.isProductionmanager = false
  //   this.isMemberToGcc = false;
  //   this.isExecutiveBoardCenter = false;
  //   this.isGeneralAssemblyCenter = false;
  //   this.isDevelopmentCommitteeCenter = false;
  //   this.isAdminSys = false
  //   this.isMemberGeneralAssembly = false
  //   this.isAccountant = true;
  //   this.dynamicTitle = "Comptable";
  // }
  // onAdminSys(){
  //    this.isListAreas = false;
  //   this.isProductionmanager = false
  //   this.isMemberToGcc = false;
  //   this.isExecutiveBoardCenter = false;
  //   this.isGeneralAssemblyCenter = false;
  //   this.isDevelopmentCommitteeCenter = false;
  //   this.isAccountant = false;
  //   this.isMemberGeneralAssembly = false
  //   this.isAdminSys = true;
  //   this.dynamicTitle = "Administrateur Système";
  // }

  // onDevelopmentCommitteeCenter(){
  //    this.isListAreas = false;
  //   this.isProductionmanager = false
  //   this.isMemberToGcc = false;
  //   this.isExecutiveBoardCenter = false;
  //   this.isGeneralAssemblyCenter = false;
  //   this.isAccountant = false;
  //   this.isMemberGeneralAssembly = false
  //   this.isAdminSys = false;
  //   this.isDevelopmentCommitteeCenter = true;
  //   this.dynamicTitle = "Assemblée générale des membres";
  // }

  // onGeneralAssemblyCenter(){
  //    this.isListAreas = false;
  //   this.isProductionmanager = false
  //   this.isMemberToGcc = false;
  //   this.isExecutiveBoardCenter = false;
  //   this.isAccountant = false;
  //   this.isMemberGeneralAssembly = false
  //   this.isAdminSys = false;
  //   this.isDevelopmentCommitteeCenter = false;
  //   this.isGeneralAssemblyCenter = true;
  //   this.dynamicTitle = "Comité de Développement";
  // }

  // onExecutiveBoardCenter(){
  //    this.isListAreas = false;
  //   this.isProductionmanager = false
  //   this.isMemberToGcc = false;
  //   this.isAccountant = false;
  //   this.isMemberGeneralAssembly = false
  //   this.isAdminSys = false;
  //   this.isDevelopmentCommitteeCenter = false;
  //   this.isGeneralAssemblyCenter = false;
  //   this.isExecutiveBoardCenter = true;
  //   this.dynamicTitle = "Assemblée représentative des Clubs";
  // }

  // onMemberToGcc(){
  //    this.isListAreas = false;
  //   this.isProductionmanager = false
  //   this.isAccountant = false;
  //   this.isMemberGeneralAssembly = false
  //   this.isAdminSys = false;
  //   this.isDevelopmentCommitteeCenter = false;
  //   this.isGeneralAssemblyCenter = false;
  //   this.isExecutiveBoardCenter = false;
  //   this.isMemberToGcc = true;
  //   this.dynamicTitle = "Conseil d’Administration";
  // }

  // onProductionmanager(){
  //    this.isListAreas = false;
  //   this.isAccountant = false;
  //   this.isMemberGeneralAssembly = false
  //   this.isAdminSys = false;
  //   this.isDevelopmentCommitteeCenter = false;
  //   this.isGeneralAssemblyCenter = false;
  //   this.isExecutiveBoardCenter = false;
  //   this.isMemberToGcc = false;
  //   this.isProductionmanager = true;
  //   this.dynamicTitle = "Comité de Gouvernance et des Rémunérations";
  // }

  // allExcepArea(){
  //   this.isListAreas = false;
  //   this.isAccountant = false;
  //   this.isMemberGeneralAssembly = false
  //   this.isAdminSys = false;
  //   this.isDevelopmentCommitteeCenter = false;
  //   this.isGeneralAssemblyCenter = false;
  //   this.isExecutiveBoardCenter = false;
  //   this.isMemberToGcc = false;
  //   this.isProductionmanager = false;
  // }

  onListAreas(){
    // this.allExcepArea();
    this.isListPosts = false;
    this.isListAreas = true;
    this.dynamicTitle = "Liste des zones";
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
          this.centerService.removeArea(this.idCenter, id).subscribe(
            () => {
              this.getCenter();;
              swalWithBootstrapButtons.fire({
                title: 'Supprimée !',
                text: 'Zone a été supprimée',
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
            text: 'Vous avez annulé la suppression',
            confirmButtonColor: '#d33',
          });
        }
      });
  }

  onListPosts(){
    this.isListAreas = false;
    this.isListPosts = true;
    this.dynamicTitle = "Liste des postes";
  }

}
