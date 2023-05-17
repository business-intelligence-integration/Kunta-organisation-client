import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Level } from 'src/app/core/classes/level';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { TransversalityLevelService } from 'src/app/core/services/transversality-level/transversality-level.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transversality',
  templateUrl: './transversality.component.html',
  styleUrls: ['./transversality.component.scss']
})
export class TransversalityComponent implements OnInit {

  show: boolean = false;
  levels: Level[] = [];
  level: Level = new Level();
  openUpdateModal: string = "";
  openCreateModal: string = "";
  updateLevelForm!: FormGroup;
  createLevelForm!: FormGroup;
  constructor(private transversalityService: TransversalityLevelService,
    private formBuilder: FormBuilder, 
    private utilityService: UtilityService,
    private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.getAllLevel();
    this.formInit();
  }

  formInit() {
    this.updateLevelForm = this.formBuilder.group({
      id: new FormControl(null, Validators.required),
      label: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
    })

    this.createLevelForm = this.formBuilder.group({
      label: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
    })

  }

  getAllLevel(){
    this.transversalityService.findAllLevels().subscribe((res)=>{
      if ( res == null ) {
        this.show = true;
        this.loaderService.hideLoader();
      } else {
        this.levels = res.data;
        if( this.levels.length <= 0 ) {
          this.show = true;
          this.loaderService.hideLoader();
        } else {
          this.show = false;
          this.loaderService.hideLoader();
        }
      }
    })
  }

  onUpdateLevel(id: number){
    this.transversalityService.findLevelById(id).subscribe((res)=>{
      this.level = res.data;
      this.openUpdateModal = "is-active";
    })
  }

  closeUpdateLevelModal(){
    this.openUpdateModal = "";
  }
  closeCreateLevelModal(){
    this.openCreateModal = "";
  }
  onSubmitUpdateLevel(){
    const formValue = this.updateLevelForm.value;
    this.level.label =formValue.label;
    this.level.description = formValue.description;
    this.updateLevel(this.level, formValue.id)
  }

  updateLevel(level: Level, id: number){
    this.transversalityService.updateLevel(level, id).subscribe(()=>{
      this.getAllLevel();
      this.closeUpdateLevelModal();
      this.utilityService.showMessage(
        'success',
        'Niveau mis a jour avec succès',
        '#06d6a0',
        'white'
      );
    }, ()=>{
      this.utilityService.showMessage(
        'warning',
        'Une erreur s\'est produite !',
        '#e62965',
        'white'
      );
    })
  }

  onCtreateLevel(){
    this.openCreateModal = "is-active";
  }

  onSubmitCreateLevel(){
    const formValue = this.createLevelForm.value;
    this.level.label =formValue.label;
    this.level.description = formValue.description;
    this.crateLevel(this.level)
  }

  crateLevel(level: Level){
    this.transversalityService.createLevel(level).subscribe(()=>{
      this.getAllLevel();
      this.closeCreateLevelModal();
      this.utilityService.showMessage(
        'success',
        'Niveau crée avec succès',
        '#06d6a0',
        'white'
      );
    }, ()=>{
      this.utilityService.showMessage(
        'warning',
        'Une erreur s\'est produite !',
        '#e62965',
        'white'
      );
    })
  }

  onDelate(id: number){
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
          this.transversalityService.deleteLevel(id).subscribe(
            () => {
              this.getAllLevel();
              swalWithBootstrapButtons.fire({
                title: 'Supprimé !',
                text: 'Niveau a été supprimé.',
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
