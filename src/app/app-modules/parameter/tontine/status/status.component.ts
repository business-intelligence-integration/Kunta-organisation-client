import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/core/classes/status';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { StatusService } from 'src/app/core/services/organisation/status/status.service';


@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  show: boolean = false;
  statusArray: Status[] = [];

  constructor(private statusService: StatusService,
    private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.getAllStatus();
  }

  getAllStatus(){
    this.statusService.findAllStatus().subscribe((res)=>{
      this.statusArray = res.data;
      if ( this.statusArray.length <= 0 ) {
        this.show = true;
      }
      this.loaderService.hideLoader();
    })
  }
}
