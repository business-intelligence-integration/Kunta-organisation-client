import { Component, OnInit } from '@angular/core';
import { Session } from 'src/app/core/classes/session';
import { SessionService } from 'src/app/core/services/session/session.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {

  session: Session = new Session()
  sessions: Session[]=[];

  constructor(private sessionService: SessionService) { }

  ngOnInit(): void {
    this.getAllSession();
  }

  getAllSession(){
    this.sessionService.findAllSessions().subscribe((res)=>{
      console.log("resS::", res);
      
      this.sessions = res.data
    })
  }

}
