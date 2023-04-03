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
export class CenterService {

  private baseUrl = environment.baseUrlApi

  constructor(private httpClient: HttpClient, private utilityService: UtilityService) {
    httpOptions.headers = httpOptions.headers.set('Authorization', "Bearer " + this.utilityService.loadToken())
  }

  findAllCenters():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'centers', httpOptions);
  }

  createCenter(center: Organism):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + 'centers', center, httpOptions);
  }

  getCenterById(id: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'centers/'+ id,httpOptions);
  }

  updateCenterById(center: Organism, id: number):Observable<any>{
    return this.httpClient.put<any>(this.baseUrl + 'centers/'+ id, center, httpOptions);
  }

  deleteCenterById(id: number):Observable<any>{
    return this.httpClient.delete<any>(this.baseUrl + 'centers/'+ id,httpOptions);
  }

  addAreaToCenter(idCenter: number, idArea: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `centers/${idCenter}/add-area/${idArea}`, {}, httpOptions);
  }

  addAdminSys(idCenter: number, idMember: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `centers/${idCenter}/add-admin-sys/${idMember}`, {}, httpOptions);
  }
  addToClubsGeneralAssembly(idCenter: number, idMember: number, idPost: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `centers/${idCenter}/add-member-to-clubs-general-assembly/post/${idPost}/user/${idMember}`, {}, httpOptions);
  }
  addToDevelopmentCommittee(idCenter: number, idMember: number, idPost: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `centers/${idCenter}/add-member-to-development-committee/post/${idPost}/user/${idMember}`, {}, httpOptions);
  }
  addToExecutiveBoard(idCenter: number, idMember: number, idPost: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `centers/${idCenter}/add-member-to-executive-board/post/${idPost}/user/${idMember}`, {}, httpOptions);
  }
  
  addToGcc(idCenter: number, idMember: number, idPost: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `centers/${idCenter}/add-member-to-gcc/post/${idPost}/user/${idMember}`, {}, httpOptions);
  }
  addAccountant(idCenter: number, idMember: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `centers/${idCenter}/add-accountant/${idMember}`, {}, httpOptions);
  }
  addToMembersGeneralAssembly(idCenter: number, idMember: number, idFonction: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `centers/${idCenter}/add-member-to-members-general-assembly/post/${idFonction}/user/${idMember}`, {}, httpOptions);
  }
  addProductionManager(idCenter: number, idMember: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `centers/${idCenter}/add-production-manager/${idMember}`, {}, httpOptions);
  }
  removeAccountant(idCenter: number, idMember: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `centers/${idCenter}/remove-accountant`, {}, httpOptions);
  }
  removeAdminSys(idCenter: number, idMember: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `centers/${idCenter}/remove-admin-sys`, {}, httpOptions);
  }
  removeArea(idCenter: number, idMember: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `centers/${idCenter}/remove-area/${idMember}`, {}, httpOptions);
  }
  removeFromClubsGeneralAssembly(idCenter: number, idMember: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `centers/${idCenter}/remove-member-from-clubs-general-assembly/${idMember}`, {}, httpOptions);
  }
  removeFromDevelopmentCommittee(idCenter: number, idMember: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `centers/${idCenter}/remove-member-from-development-committee/${idMember}`, {}, httpOptions);
  }
  removeFromExecutiveBoard(idCenter: number, idMember: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `centers/${idCenter}/remove-member-from-executive-board/${idMember}`, {}, httpOptions);
  }
  removeFromGcc(idCenter: number, idMember: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `centers/${idCenter}/remove-member-from-gcc/${idMember}`, {}, httpOptions);
  }
  removeFromMembersGeneralAssembly(idCenter: number, idMember: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `centers/${idCenter}/remove-member-from-members-general-assembly/${idMember}`, {}, httpOptions);
  }
  removeProductionManager(idCenter: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `centers/${idCenter}/remove-production-manager`, {}, httpOptions);
  }

  getAllCenterUsersId(idCenter: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + `centers/${idCenter}/users`, httpOptions);
  }

  findCentersByName(name: string):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'centers/search?name='+ name, httpOptions);
  }

  findCenterByIdArea(idArea: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'centers/findBy/' + idArea, httpOptions);
  }
}

