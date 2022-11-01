import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Organism } from 'src/app/core/classes/organism';
import { AreaService } from 'src/app/core/services/areas/area.service';
import { ClubService } from 'src/app/core/services/clubs/club.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';

@Component({
  selector: 'app-view-more-are-club',
  templateUrl: './view-more-are-club.component.html',
  styleUrls: ['./view-more-are-club.component.scss']
})
export class ViewMoreAreClubComponent implements OnInit {
  ngSelect: any = "0"
  activeRightMenu: string = "";
  activeToggle: string = "";
  homeSider: string = "";
  isPushed: string = "";
  addClubForm!: FormGroup;
  openClubModal: string = "";
  idArea: number = 0;

  clubs: Organism [] = [];
  constructor(private areaService: AreaService, 
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private clubService: ClubService,
    private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.getArea();
    this.getAllClubs();
    this.formInit();
  }

  formInit() {
    this.addClubForm = this.formBuilder.group({
      id: new FormControl(null, Validators.required),
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

  getArea(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.areaService.getAreaById(params['id']).subscribe((res)=>{
        this.clubs = res.data.clubs
      });
    })
  }

  closeClubModal(){
    this.openClubModal = "";
  }

  onAddClub(){
    this.openClubModal = "is-active";
  }

  onSubmitclub(){
    const formValue = this.addClubForm.value;
  }

  addClubToArea(idArea: number, idClub: number){
    this.areaService.addClubToArea(idArea, idClub).subscribe(()=>{
      this.utilityService.showMessage(
        'success',
        'Club successfully added to are',
        '#06d6a0',
        'white'
      );
    })
  }

  getAllClubs(){
    this.clubService.findAllClubs().subscribe((res)=>{
      this.clubs = res.data
      console.log("clubs::", this.clubs);
      
    })
  }

}
