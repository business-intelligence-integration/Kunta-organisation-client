import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OperationSession } from 'src/app/core/classes/operationSession';
import { SessionService } from 'src/app/core/services/session/session.service';

@Component({
  selector: 'app-view-more-details-session',
  templateUrl: './view-more-details-session.component.html',
  styleUrls: ['./view-more-details-session.component.scss']
})
export class ViewMoreDetailsSessionComponent implements OnInit {

  operationSession: OperationSession = new OperationSession();
  constructor(private activatedRoute: ActivatedRoute,
    private sessionService: SessionService) { }

  ngOnInit(): void {
    this.getSession();
  }

  getSession(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.sessionService.findSessionById(params['id']).subscribe((res)=>{
       this.operationSession = res.data
       console.log("this.operationSession::", this.operationSession);
       
      });
    })
  }
}
