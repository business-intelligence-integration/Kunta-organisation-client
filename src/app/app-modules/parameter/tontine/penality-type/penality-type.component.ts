import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PenalityType } from 'src/app/core/classes/penalityType';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { PenaltyTypeService } from 'src/app/core/services/penalty-type/penalty-type.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';

@Component({
  selector: 'app-penality-type',
  templateUrl: './penality-type.component.html',
  styleUrls: ['./penality-type.component.scss']
})
export class PenalityTypeComponent implements OnInit {

  show: boolean = false;
  penaltyTypes: PenalityType[] = [];
  penaltyType: PenalityType = new PenalityType();
  openPenaltyTypeModal: string = "";
  penaltyTypeForm!: FormGroup;

  constructor(private penaltyTypeService: PenaltyTypeService,
    private formBuilder: FormBuilder, 
    private utilityService: UtilityService,
    private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.getAllPenalType();
    this.formInit();
  }

  formInit() {
    this.penaltyTypeForm = this.formBuilder.group({
      amount: new FormControl(null, Validators.required),
      label: new FormControl(null, Validators.required),
    })
  }

  getAllPenalType(){
    this.penaltyTypeService.findAllPenaltyTypes().subscribe((res)=>{
      if ( res == null ) {
        this.show = true;
        this.loaderService.hideLoader();
      } else {
        this.penaltyTypes = res.data;
        if( this.penaltyTypes.length <= 0 ) {
          this.show = true;
          this.loaderService.hideLoader();
        } else {
          this.show = false;
          this.loaderService.hideLoader();
        }
      }
    })
  }

  closePenaltyTypeModal(){
    this.openPenaltyTypeModal = "";
  }

  onUpdatePenaltyType(id: number){
    this.penaltyTypeService.findPenaltyTypeById(id).subscribe((res)=>{
      this.penaltyType = res.data;
      this.openPenaltyTypeModal = "is-active";
    })
  }

  onSubmitUpdatePenaltyType(idPenaltyType: number){
    const formValue = this.penaltyTypeForm.value;
    this.penaltyType.amount =formValue.amount;
    this.penaltyType.label =formValue.label;
    this.makePenalty(this.penaltyType, idPenaltyType)
  }

  makePenalty(penaltyType: PenalityType, idPenaltyType: number){
    this.penaltyTypeService.updatePenaltyType(penaltyType, idPenaltyType).subscribe((res)=>{
      if(res) {
        if (res.data == null ) {
          this.utilityService.showMessage(
            'warning',
            res.message,
            '#e62965',
            'white'
          );
        } else {
          this.getAllPenalType()
          this.closePenaltyTypeModal();
          this.utilityService.showMessage(
            'success',
            'Le type de pénalité a été modifier avec succès',
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

}
