import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OperationSession } from 'src/app/core/classes/operationSession';
import { SessionService } from 'src/app/core/services/session/session.service';
import {Location} from "@angular/common";
import { Session } from 'src/app/core/classes/session';

@Component({
  selector: 'app-view-more-details-session',
  templateUrl: './view-more-details-session.component.html',
  styleUrls: ['./view-more-details-session.component.scss']
})
export class ViewMoreDetailsSessionComponent implements OnInit {

  operationSession: OperationSession = new OperationSession();
  session: Session = new Session();
  constructor(private activatedRoute: ActivatedRoute,
    private sessionService: SessionService,
    private location: Location) { }

  ngOnInit(): void {
    this.getSession();
  }

  backBack(){this.location.back()}

  getSession(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.sessionService.findSessionById(params['id']).subscribe((res)=>{
       this.session = res.data
       console.log("session::", res.data);
       
      });
    })
  }
}
