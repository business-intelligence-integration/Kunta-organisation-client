import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cycle } from '../../classes/cycle';
import { UtilityService } from '../utility/utility.service';

const httpOptions ={
  headers: new HttpHeaders({
    'content-type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class CycleService {

  private baseUrl = environment.baseUrlApiActivity
  constructor(private httpClient: HttpClient, private utilityService: UtilityService){
    httpOptions.headers = httpOptions.headers.set('Authorization', "Bearer " + this.utilityService.loadToken())
  }

  findAllCycles():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'cycles', httpOptions);
  }

  findCycleById(id: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'cycles/'+ id, httpOptions);
  }

  updateCycle(id: number, cycle: Cycle):Observable<any>{
    return this.httpClient.put<any>(this.baseUrl + 'cycles/'+ id, cycle, httpOptions);
  }

  findAllSessionsOfCycle(id: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'cycles/' + id + '/sessions', httpOptions);
  }

  deleteSessionOfACycle(idCycle: number, idSession: number):Observable<any>{
    return this.httpClient.delete<any>(this.baseUrl +'cycles/' + idCycle + '/sessions/' + idSession, httpOptions);
  }

  closeCycleById(idCycle: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + 'cycles/'+ idCycle + "/close", httpOptions);
  }

}
