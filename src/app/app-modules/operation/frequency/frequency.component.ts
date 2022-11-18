import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Frequency } from 'src/app/core/classes/frequency';
import { FrequencyService } from 'src/app/core/services/frequencies/frequency.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-frequency',
  templateUrl: './frequency.component.html',
  styleUrls: ['./frequency.component.scss']
})
export class FrequencyComponent implements OnInit {

  frequencies: Frequency[] = [];
  frequency: Frequency = new Frequency();
  openUpdateModal: string = "";
  openCreateModal: string = "";
  updateFrequenceForm!: FormGroup;
  createFrequenceForm!: FormGroup;
  constructor(private frequencyService: FrequencyService, 
    private formBuilder: FormBuilder, 
    private utilityService: UtilityService) { }

  ngOnInit(): void {
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
      this.frequencies = res.data;
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
    this.frequencyService.updateFrequency(frequency, id).subscribe(()=>{
      this.getAllFrequency();
      this.closeUpdateFrequenceModal();
      this.utilityService.showMessage(
        'success',
        'Frenquence successfully updated',
        '#06d6a0',
        'white'
      );
    }, ()=>{
      this.utilityService.showMessage(
        'warning',
        'An error has occurred',
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
    this.crateFrequency(this.frequency);
  }

  crateFrequency(frequency: Frequency){
    this.frequencyService.createFrequency(frequency).subscribe(()=>{
      this.getAllFrequency();
      this.closeCreateFrequenceModal();
      this.utilityService.showMessage(
        'success',
        'Frenquence successfully created',
        '#06d6a0',
        'white'
      );
    }, ()=>{
      this.utilityService.showMessage(
        'warning',
        'An error has occurred',
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
          this.frequencyService.deleteFrequency(id).subscribe(
            () => {
              this.getAllFrequency();
              swalWithBootstrapButtons.fire({
                title: 'Deleted !',
                text: 'Frequence has been deleted.',
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

}
