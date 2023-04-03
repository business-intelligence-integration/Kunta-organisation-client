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
export class MainOfficeService {

  private baseUrl = environment.baseUrlApi

  constructor(private httpClient: HttpClient, private utilityService: UtilityService) {
    httpOptions.headers = httpOptions.headers.set('Authorization', "Bearer " + this.utilityService.loadToken())
  }
  
  findAllOffices():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'main-office', httpOptions);
  }

  createMainOffice(mainOffice: Organism):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + 'main-office', mainOffice, httpOptions);
  }

  getById(id: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'main-office/'+ id, httpOptions);
  }

  updateOffice(mainOffice: Organism, id: number):Observable<any>{
    return this.httpClient.put<any>(this.baseUrl + 'main-office/'+ id, mainOffice, httpOptions);
  }

  deleteMainOffice(id: number):Observable<any>{
    return this.httpClient.delete<any>(this.baseUrl + 'main-office/'+ id, httpOptions);
  }

  addCenterToMainOffice(idMainOffice: number, idCenter: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `main-office/${idMainOffice}/add-center/${idCenter}`, {}, httpOptions);
  }
  
  removeCenterFromMainOffice(idMainOffice: number, idCenter: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `main-office/${idMainOffice}/remove-center/${idCenter}`, {}, httpOptions);
  }

  addMemeberToCGA(idMainOffice: number, idMember: number, idPost: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `main-office/${idMainOffice}/add-to-centers-general-assembly/post/${idPost}/user/${idMember}`, {}, httpOptions);
  }

  addMemberToExecutiveBoard(idMainOffice: number, idMember: number, idFonction: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `main-office/${idMainOffice}/add-to-executive-board/post/${idFonction}/user/${idMember}`, {}, httpOptions);
  }
  addMemberToGcc(idMainOffice: number, idMember: number, idPost: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `main-office/${idMainOffice}/add-to-governance-and-compensation-committee/post/${idPost}/user/${idMember}`, {}, httpOptions);
  }

  addMemberToPmc(idMainOffice: number, idMember: number, idPost: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `main-office/${idMainOffice}/add-to-production-and-monitoring-committee/post/${idPost}/user/${idMember}`, {}, httpOptions);
  }

  addMemberToSdc(idMainOffice: number, idMember: number, idPost: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `main-office/${idMainOffice}/add-to-strategic-development-committee/post/${idPost}/user/${idMember}`, {}, httpOptions);
  }

  removeFromCGA(idMainOffice: number, idMember: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `main-office/${idMainOffice}/remove-from-centers-general-assembly/${idMember}`, {}, httpOptions);
  }

  removeFromExecutiveBoard(idMainOffice: number, idMember: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `main-office/${idMainOffice}/remove-from-executive-board/${idMember}`, {}, httpOptions);
  }

  removeFromGcc(idMainOffice: number, idMember: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `main-office/${idMainOffice}/remove-from-governance-and-compensation-committee/${idMember}`, {}, httpOptions);
  }

  removeFromPmc(idMainOffice: number, idMember: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `main-office/${idMainOffice}/remove-from-production-and-monitoring-committee/${idMember}`, {}, httpOptions);
  }

  removeFromSdc(idMainOffice: number, idMember: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `main-office/${idMainOffice}/remove-from-strategic-development-committee/${idMember}`, {}, httpOptions);
  }



}
