import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PieceType } from 'src/app/core/classes/pieceType';
import { PieceTypeService } from 'src/app/core/services/piece-type/piece-type.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-piece-type',
  templateUrl: './piece-type.component.html',
  styleUrls: ['./piece-type.component.scss']
})
export class PieceTypeComponent implements OnInit {

  openCreateModal: string = "";
  openUpdateModal: string = "";
  createPieceTypeForm!: FormGroup;
  updatePieceTypeForm!: FormGroup;
  pieceType: PieceType = new PieceType();
  pieceTypes: PieceType[] = [];
  isSaving: boolean = false;
  constructor(private formBuilder: FormBuilder,
    private pieceTypeService: PieceTypeService,
    private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.formInit();
    this.getAllPieceType();
  }

  formInit() {
    this.createPieceTypeForm = this.formBuilder.group({
      label: new FormControl(null, Validators.required),
    })

    this.updatePieceTypeForm = this.formBuilder.group({
      label: new FormControl(null, Validators.required),
    })
  }

  onOpenCreateModal(){
    this.openCreateModal = "is-active";
  }

  closeCreateModal(){
    this.openCreateModal = "";
  }
  
  getAllPieceType(){
    this.pieceTypeService.findAllPieceTypes().subscribe((res)=>{
      this.pieceTypes = res.data;
    })
  }
  
  onSubmitCreateTypePiece(){
    const formValue = this.createPieceTypeForm.value;
    this.cratePieceType(formValue.label);
  }

  cratePieceType(label: string){
    this.isSaving = true;
    this.pieceTypeService.createPieceType(label).subscribe((res)=>{
      this.closeCreateModal();
      this.getAllPieceType();
      this.isSaving = false;
      this.utilityService.showMessage(
        'success',
        'Type de pièce crée avec succès',
        '#06d6a0',
        'white'
      );
    }, ()=>{
      this.isSaving = false;
      this.utilityService.showMessage(
        'warning',
        'Une erreur s\'est produite',
        '#e62965',
        'white'
      );
    })
  }

  onOpenUpdateModal(id: number){
    this.pieceTypeService.findPieceTypeById(id).subscribe((res)=>{
      this.openUpdateModal = "is-active";
      this.pieceType = res.data;
    })
  }

  closeUpdateModal(){
  this.openUpdateModal = "";
  }

  onDelete(id: number){
    this.deleteMessage(id);
  }

  onSubmitUpdatePieceType(id: number){
    const formValue = this.updatePieceTypeForm.value;
    this.pieceType.label = formValue.label;
    this.updatePieceType(id, this.pieceType)
  }

  updatePieceType(id: number, pieceType: PieceType){
    this.isSaving = true;
    this.pieceTypeService.updatePieceType(id, pieceType).subscribe(()=>{
      this.closeUpdateModal();
      this.getAllPieceType();
      this.isSaving = false;
      this.utilityService.showMessage(
        'success',
        'Type de pièce modifié avec succès',
        '#06d6a0',
        'white'
      );
    }, ()=>{
      this.isSaving = false;
      this.utilityService.showMessage(
        'warning',
        'Une erreur s\'est produite',
        '#e62965',
        'white'
      );
    })
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
          this.pieceTypeService.deletePieceType(id).subscribe(
            () => {
              this.getAllPieceType();
              swalWithBootstrapButtons.fire({
                title: 'Supprimé !',
                text: 'Le type de pièce a bien été supprimé !.',
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
}
