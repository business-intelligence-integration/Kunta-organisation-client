import { Component, OnInit } from '@angular/core';
import { Session } from 'src/app/core/classes/session';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { SessionService } from 'src/app/core/services/session/session.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {

  show: boolean = false;
  session: Session = new Session()
  sessions: Session[]=[];

  constructor(private sessionService: SessionService,
    private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.getAllSession();
  }

  getAllSession(){
    this.sessionService.findAllSessions().subscribe((res)=>{
      if ( res == null ) {
        this.show = true;
        this.loaderService.hideLoader();
      } else {
        this.sessions = res.data;
        if( this.sessions.length <= 0 ) {
          this.show = true;
          this.loaderService.hideLoader();
        } else {
          this.show = false;
          this.loaderService.hideLoader();
        }
      }
    })
  }

}
