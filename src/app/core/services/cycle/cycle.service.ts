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
    return this.httpClient.get<any>(this.baseUrl + 'cycles');
  }

  findCycleById(id: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'cycles/'+ id);
  }

  updateCycle(id: number, cycle: Cycle):Observable<any>{
    return this.httpClient.put<any>(this.baseUrl + 'cycles/'+ id, cycle);
  }

  findAllSessionsOfCycle(id: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'cycles/' + id + '/sessions');
  }

  deleteSessionOfACycle(idCycle: number, idSession: number):Observable<any>{
    return this.httpClient.delete<any>(this.baseUrl +'cycles/' + idCycle + '/sessions/' + idSession);
  }

  closeCycleById(idCycle: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + 'cycles/'+ idCycle + "/close", {});
  }

  findCycleByName(name: string):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'cycles/search?name=' + name, httpOptions);
  }

}
