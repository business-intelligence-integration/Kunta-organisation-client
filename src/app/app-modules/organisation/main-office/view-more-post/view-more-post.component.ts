import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Organism } from 'src/app/core/classes/organism';
import { MainOfficeService } from 'src/app/core/services/main-offices/main-office.service';

@Component({
  selector: 'app-view-more-post',
  templateUrl: './view-more-post.component.html',
  styleUrls: ['./view-more-post.component.scss']
})
export class ViewMorePostComponent implements OnInit {

  mainOffice: Organism
  activeRightMenu: string = "";
  activeToggle: string = "";
  homeSider: string = "";
  isPushed: string = "";
  centers: Organism[] = [];

  constructor(private mainOfficeService: MainOfficeService,
    private activatedRoute: ActivatedRoute,) {
    this.mainOffice = new Organism();
   }

  ngOnInit(): void {
    this.getMainOffice();
  }

  getMainOffice(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.mainOfficeService.getById(params['id']).subscribe((res)=>{
        this.mainOffice = res;
        this.centers = res.data.centers;
        
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

  onUpdateCenter(id: number){

  }

  onDeleteCenter(id: number){

  }

  onOpenAddCenter(){

  }
}
