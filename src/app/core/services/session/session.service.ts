import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Session } from '../../classes/session';
import { UtilityService } from '../utility/utility.service';

const httpOptions ={
  headers: new HttpHeaders({
    'content-type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private baseUrl = environment.baseUrlApiActivity
  constructor(private httpClient: HttpClient, private utilityService: UtilityService){
    httpOptions.headers = httpOptions.headers.set('Authorization', "Bearer " + this.utilityService.loadToken())
  }

  findAllSessions():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'sessions', httpOptions);
  }

  findSessionById(id: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'sessions/'+ id, httpOptions);
  }

  updateSession(session: Session, id: number):Observable<any>{
    return this.httpClient.put<any>(this.baseUrl + 'sessions/'+ id, session, httpOptions);
  }
}
