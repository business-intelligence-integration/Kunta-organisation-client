import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Level } from 'src/app/core/classes/level';
import { TransversalityLevelService } from 'src/app/core/services/transversality-level/transversality-level.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transversality',
  templateUrl: './transversality.component.html',
  styleUrls: ['./transversality.component.scss']
})
export class TransversalityComponent implements OnInit {

  levels: Level[] = [];
  level: Level = new Level();
  openUpdateModal: string = "";
  openCreateModal: string = "";
  updateLevelForm!: FormGroup;
  createLevelForm!: FormGroup;
  constructor(private transversalityService: TransversalityLevelService,
    private formBuilder: FormBuilder, 
    private utilityService: UtilityService) { }

  ngOnInit(): void {
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
      this.levels = res.data;
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
        'Level successfully updated',
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
        'Level successfully created',
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
          this.transversalityService.deleteLevel(id).subscribe(
            () => {
              this.getAllLevel();
              swalWithBootstrapButtons.fire({
                title: 'Deleted !',
                text: 'Level has been deleted.',
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
