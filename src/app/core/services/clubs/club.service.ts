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
export class ClubService {

  private baseUrl = environment.baseUrlApi
  constructor(private httpClient: HttpClient, private utilityService: UtilityService) {
    httpOptions.headers = httpOptions.headers.set('Authorization', "Bearer " + this.utilityService.loadToken())
  }

  findAllClubs():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'clubs', httpOptions);
  }

  createclub(club: Organism, idArea: number):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + 'clubs/area/' + idArea, club, httpOptions);
  }

  getclubById(id: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'clubs/'+ id, httpOptions);
  }

  updateclubById(club: Organism, id: number):Observable<any>{
    return this.httpClient.put<any>(this.baseUrl + 'clubs/'+ id, club, httpOptions);
  }

  deleteclubById(id: number):Observable<any>{
    return this.httpClient.delete<any>(this.baseUrl + 'clubs/'+ id, httpOptions);
  }

  addMemberToClub(idClub: number, idMember: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `clubs/${idClub}/add-member/${idMember}`, {}, httpOptions);
  }
 
  addPilotToClub(idClub: number, idPilot: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `clubs/${idClub}/add-pilot/${idPilot}`, {}, httpOptions);
  }
  
  removeMemberFromClub(idClub: number, idMember: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `clubs/${idClub}/remove-member/${idMember}`, {}, httpOptions);
  }

  removePilot(idClub: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `clubs/${idClub}/remove-pilot`, {}, httpOptions);
  }

  getAllClubUsersId(idClub: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + `clubs/${idClub}/users`, httpOptions);
  }
}
