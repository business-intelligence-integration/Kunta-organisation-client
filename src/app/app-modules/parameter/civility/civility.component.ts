import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Civility } from 'src/app/core/classes/civility';
import { CivilityService } from 'src/app/core/services/civility/civility.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-civility',
  templateUrl: './civility.component.html',
  styleUrls: ['./civility.component.scss']
})
export class CivilityComponent implements OnInit {

  openCreateModal: string = "";
  openUpdateModal: string = "";
  civilities: Civility[] = [];
  civility: Civility = new Civility()
  createCivilityForm!: FormGroup;
  updateCivilityForm!: FormGroup;
  isSaving: boolean = false;
  constructor(private civilityService: CivilityService,  
    private formBuilder: FormBuilder, 
    private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.getAllCivilities();
    this.formInit();
  }

  formInit() {
    this.createCivilityForm = this.formBuilder.group({
      label: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
    })

    this.updateCivilityForm = this.formBuilder.group({
      label: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
    })
  }
  onOpenCreateModal(){
    this.openCreateModal = "is-active";
  }

  closeCreateModal(){
    this.openCreateModal = "";
  }

  getAllCivilities(){
    this.civilityService.findAllCivilities().subscribe((res)=>{
      this.civilities = res.data;
    })
  }

  onSubmitCivility(){
    const formValue = this.createCivilityForm.value;
    this.civility.label = formValue.label;
    this.civility.name = formValue.name;
    this.createCivility(this.civility)
  }

  createCivility(civlity: Civility){
    this.isSaving = true;
    this.civilityService.createCivility(civlity).subscribe((res)=>{
      console.log("Civility::", res);
      
      this.isSaving = false;
      this.closeCreateModal()
      this.getAllCivilities();
      this.utilityService.showMessage(
        'success',
        'Civilité crée avec succès !',
        '#06d6a0',
        'white'
      );
    }, ()=>{
      this.isSaving = false;
      this.utilityService.showMessage(
        'warning',
        'une erreur d\'est produites',
        '#e62965',
        'white'
      );
    })
  }

  closeUpdateModal(){
    this.openUpdateModal = "";
  }

  onOpenUpdateModal(id: number){
    this.civilityService.findCivilityById(id).subscribe((res)=>{
      this.civility = res.data
      this.openUpdateModal = "is-active";
    })
  }

  onSubmitUpdateCivility(id: number){
    const formValue = this.updateCivilityForm.value;
    this.civility.label = formValue.label;
    this.civility.name = formValue.name;
    this.updateCivility(id, this.civility)
  }

  updateCivility(idCivility: number, civility: Civility){
    this.isSaving = true;
    this.civilityService.updateCivility(idCivility, civility).subscribe(()=>{
       this.isSaving = false;
      this.closeUpdateModal();
      this.getAllCivilities();
       this.utilityService.showMessage(
        'success',
        'Civilité modifiée avec succès !',
        '#06d6a0',
        'white'
      );
    }, ()=>{
       this.isSaving = false;
      this.utilityService.showMessage(
        'warning',
        'une erreur d\'est produites',
        '#e62965',
        'white'
      );
    })
  }

  onDelete(id: number){
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
        title: 'Vous êtes sûr ?',
        text: "Vous ne pourrez pas revenir en arrière !",
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
          this.civilityService.deleteCivility(id).subscribe(
            () => {
              this.getAllCivilities();
              swalWithBootstrapButtons.fire({
                title: 'Deleted !',
                text: 'La civilité a bien été supprimé !.',
                confirmButtonColor: '#198AE3',
              });
            },
            () => {
              swalWithBootstrapButtons.fire({
                title: 'Cancelled',
                text: 'une erreur s\'est produite !',
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
