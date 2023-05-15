import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Gain } from 'src/app/core/classes/gain';
import { GainService } from 'src/app/core/services/gains/gain.service';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gain',
  templateUrl: './gain.component.html',
  styleUrls: ['./gain.component.scss']
})
export class GainComponent implements OnInit {

  show: boolean = false;
  openCreateModal: string = "";
  openUpdateModal: string = "";
  createGainForm!: FormGroup;
  updateGainForm!: FormGroup;
  gains: Gain[] = [];
  gain: Gain = new Gain();
  constructor(private gainService: GainService,
    private formBuilder: FormBuilder, 
    private utilityService: UtilityService,
    private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.getAllGains();
    this.formInit();
  }

  formInit() {
    this.updateGainForm = this.formBuilder.group({
      id: new FormControl(null, Validators.required),
      label: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
    })

    this.createGainForm = this.formBuilder.group({
      label: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
    })
  }

  onOpenCreateModal(){
    this.openCreateModal = "is-active";
  }

  closeCreateGainModal(){
    this.openCreateModal = "";
  }

  closeUpdateGainModal(){
    this.openUpdateModal = "";
  }

  onOpenUpdateModal(id: number){
    this.gainService.findGainModeById(id).subscribe((res)=>{
      this.gain = res.data;
      this.openUpdateModal = "is-active";
    })
  }

  getAllGains(){
    this.gainService.findAllGainModes().subscribe((res)=>{
      this.gains = res.data;
      if ( this.gains.length <= 0 ) {
        this.show = true;
      }
      this.loaderService.hideLoader();
    })
  }

  onDelete(id: number){
    this.deleteMessage(id);
  }

  onSubmitCreateGain(){
    const formValue = this.createGainForm.value;
    this.gain.label =formValue.label;
    this.gain.description = formValue.description;
    this.crateGain(this.gain);
  }

  crateGain(gain: Gain){
    this.gainService.createGainMode(gain).subscribe(()=>{
      this.getAllGains();
      this.closeCreateGainModal();
      this.utilityService.showMessage(
        'success',
        'Gain crée avec succès !',
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
          this.gainService.deleteGainMode(id).subscribe(
            () => {
              this.getAllGains();
              swalWithBootstrapButtons.fire({
                title: 'Supprimé !',
                text: 'Gain supprimé avec succès !',
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

  onSubmitUpdateGain(){
    const formValue = this.updateGainForm.value;
    this.gain.label =formValue.label;
    this.gain.description = formValue.description;
    this.updateGain(this.gain, formValue.id)
  }

  updateGain(gain: Gain, id: number){
    this.gainService.updateGainMode(gain, id).subscribe(()=>{
      this.getAllGains();
      this.closeUpdateGainModal();
      this.utilityService.showMessage(
        'success',
        'Gain mis a jour avec succès !',
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

}
