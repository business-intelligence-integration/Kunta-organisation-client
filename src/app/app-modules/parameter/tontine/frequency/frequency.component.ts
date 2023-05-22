import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Frequency } from 'src/app/core/classes/frequency';
import { FrequencyService } from 'src/app/core/services/frequencies/frequency.service';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-frequency',
  templateUrl: './frequency.component.html',
  styleUrls: ['./frequency.component.scss']
})
export class FrequencyComponent implements OnInit {

  show: boolean = false;
  frequencies: Frequency[] = [];
  frequency: Frequency = new Frequency();
  openUpdateModal: string = "";
  openCreateModal: string = "";
  updateFrequenceForm!: FormGroup;
  createFrequenceForm!: FormGroup;
  constructor(private frequencyService: FrequencyService, 
    private formBuilder: FormBuilder, 
    private utilityService: UtilityService,
    private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.getAllFrequency();
    this.formInit();
  }

  formInit() {
    this.updateFrequenceForm = this.formBuilder.group({
      id: new FormControl(null, Validators.required),
      label: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
    })

    this.createFrequenceForm = this.formBuilder.group({
      label: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
    })
  }

  getAllFrequency(){
    this.frequencyService.findAllFrequencies().subscribe((res)=>{
      if ( res == null ) {
        this.show = true;
        this.loaderService.hideLoader();
      } else {
        this.frequencies = res.data;
        if( this.frequencies.length <= 0 ) {
          this.show = true;
          this.loaderService.hideLoader();
        } else {
          this.show = false;
          this.loaderService.hideLoader();
        }
      }
    })
  }

  closeUpdateFrequenceModal(){
    this.openUpdateModal = "";
  }
  closeCreateFrequenceModal(){
    this.openCreateModal = "";
  }

  onOpenUpdateModal(id: number){
    this.frequencyService.getFrequencyById(id).subscribe((res)=>{
      this.frequency = res.data;
      this.openUpdateModal = "is-active";
    })
  }

  onSubmitUpdateFrequence(){
    const formValue = this.updateFrequenceForm.value;
    this.frequency.label =formValue.label;
    this.frequency.description = formValue.description;
    this.updateFrequency(this.frequency, formValue.id)
  }

  updateFrequency(frequency: Frequency, id: number){
    this.frequencyService.updateFrequency(frequency, id).subscribe((res)=>{
      if(res) {
        if (res.data == null ) {
          this.utilityService.showMessage(
            'warning',
            res.message,
            '#e62965',
            'white'
          );
        } else {
          this.getAllFrequency();
          this.closeUpdateFrequenceModal();
          this.utilityService.showMessage(
            'success',
            'Frenquence mis a jour avec succès !',
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
    }, ()=>{
      this.utilityService.showMessage(
        'warning',
        'Une erreur s\'est produite !',
        '#e62965',
        'white'
      );
    })
  }

  onOpenCreateModal(){
    this.openCreateModal = "is-active";
  }

  onSubmitCreateFrequence(){
    const formValue = this.createFrequenceForm.value;
    this.frequency.label =formValue.label;
    this.frequency.description = formValue.description;
    this.createFrequency(this.frequency);
  }

  createFrequency(frequency: Frequency){
    this.frequencyService.createFrequency(frequency).subscribe((res)=>{
      if(res) {
        if (res.data == null ) {
          this.utilityService.showMessage(
            'warning',
            res.message,
            '#e62965',
            'white'
          );
        } else {
          this.getAllFrequency();
          this.closeCreateFrequenceModal();
          this.utilityService.showMessage(
            'success',
            'Frenquence crée avec succès !',
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
    }, ()=>{
      this.utilityService.showMessage(
        'warning',
        'Une erreur s\'est produite !',
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
          this.frequencyService.deleteFrequency(id).subscribe(
            () => {
              this.getAllFrequency();
              swalWithBootstrapButtons.fire({
                title: 'Supprimé !',
                text: 'Frequence supprimé avec succès !',
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
