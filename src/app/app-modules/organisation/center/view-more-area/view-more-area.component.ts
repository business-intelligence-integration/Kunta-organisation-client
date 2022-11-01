import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Organism } from 'src/app/core/classes/organism';
import { AreaService } from 'src/app/core/services/areas/area.service';
import { CenterService } from 'src/app/core/services/centers/center.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';

@Component({
  selector: 'app-view-more-area',
  templateUrl: './view-more-area.component.html',
  styleUrls: ['./view-more-area.component.scss']
})
export class ViewMoreAreaComponent implements OnInit {
  ngSelect: any = "0"
  activeRightMenu: string = "";
  activeToggle: string = "";
  homeSider: string = "";
  isPushed: string = "";
  openAreaModal: string = "";
  addAreaForm!: FormGroup
  areas: Organism[] = [];
  areasOfCenter: Organism[] = [];
  idCenter: number = 0;

  constructor(private areaService: AreaService,
    private formBuilder: FormBuilder,
    private centerService: CenterService,
    private activatedRoute: ActivatedRoute,
    private utilityService: UtilityService) { }

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

  getCenter(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.areaService.getAreaById(params['id']).subscribe((res)=>{
        this.areasOfCenter = res.data;
        this.idCenter = res.data.id
        console.log("areas::", res);
        
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

  closeClubModal(){
    this.openAreaModal = ""
  }

  onSubmitArea(){
    const formValue = this.addAreaForm.value;
    this.addArea(this.idCenter, formValue.id)
  }

  addArea(idCenter: number, idArea: number){
    this.centerService.addAreaToCenter(idCenter, idArea).subscribe(()=>{
      this.utilityService.showMessage(
        'success',
        'Area successfully added to center',
        '#06d6a0',
        'white'
      );
    })
  }

  getAllArea(){
    this.areaService.findAllAreas().subscribe((res)=>{
      this.areas = res.data
    })
  }

}
