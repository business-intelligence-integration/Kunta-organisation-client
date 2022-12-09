import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/core/classes/status';
import { StatusService } from 'src/app/core/services/status/status.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  statusArray: Status[] = [];

  constructor(private statusService: StatusService) { }

  ngOnInit(): void {
    this.getAllStatus();
  }

  getAllStatus(){
    this.statusService.findAllStatus().subscribe((res)=>{
      this.statusArray = res.data;
    })
  }
}
