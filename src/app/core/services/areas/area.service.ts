import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Organism } from '../../classes/organism';
import { UtilityService } from '../utility/utility.service';

const httpOptions ={
  headers: new HttpHeaders({
    'content-type':'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class AreaService {

  private baseUrl = environment.baseUrlApi

  constructor(private httpClient: HttpClient, private utilityService: UtilityService) {
    httpOptions.headers = httpOptions.headers.set('Authorization', "Bearer " + this.utilityService.loadToken())
  }
  
  findAllAreas():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'areas', httpOptions);
  }

  createArea(area: Organism):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + 'areas', area, httpOptions);
  }

  getAreaById(id: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'areas/'+ id, httpOptions);
  }

  updateAreaById(area: Organism, id: number):Observable<any>{
    return this.httpClient.put<any>(this.baseUrl + 'areas/'+ id, area, httpOptions);
  }

  deleteAreaById(id: number):Observable<any>{
    return this.httpClient.delete<any>(this.baseUrl + 'areas/'+ id, httpOptions);
  }

  addClubToArea(idArea: number, idClub: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `areas/${idArea}/add-club/${idClub}`, {}, httpOptions);
  }

  removeClubFromArea(idArea: number, idClub: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `areas/${idArea}/remove-club/${idClub}`, {}, httpOptions);
  }

  addCommunicationAgentToArea(idArea: number, idAgent: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `areas/${idArea}/add-communication-agent/${idAgent}`, {}, httpOptions);
  }

  addDataEntryAgentToArea(idArea: number, idAgent: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `areas/${idArea}/add-data-entry-agent/${idAgent}`, {}, httpOptions);
  }

  removeCommunicationAgentFromArea(idArea: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `areas/${idArea}/remove-communication-agent`, {}, httpOptions);
  }

  removeDataEntryAgentFromArea(idArea: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `areas/${idArea}/remove-data-entry-agent`, {}, httpOptions);
  }

  getAllAreaUsersId(idArea: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + `areas/${idArea}/users`, httpOptions);
  }
}
