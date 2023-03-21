import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MemberComponent } from 'src/app/app-modules/organisation/user/member/member.component';
import { environment } from 'src/environments/environment';
import { Beneficiary } from '../../classes/beneficiary';
import { User } from '../../classes/user';

import { UtilityService } from '../utility/utility.service';

const httpOptions ={
  headers: new HttpHeaders({
    'content-type':'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.baseUrlApi
  private headers = new HttpHeaders;

  constructor(private httpClient: HttpClient, private utilityService: UtilityService){
    httpOptions.headers = httpOptions.headers.set('Authorization', "Bearer " + this.utilityService.loadToken())
  }
    

  getAllUsers():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'users', httpOptions);
  }

  getMemberById(id: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'users/'+ id, httpOptions);
  }

  updateMemberById(member: User, id: number):Observable<any>{
    return this.httpClient.put<any>(this.baseUrl + 'users/'+ id, member, httpOptions);
  }

  deleteById(id: number):Observable<any>{
    return this.httpClient.delete<any>(this.baseUrl + 'users/'+ id, httpOptions);
  }

  createAdmin(admin: User, idSponsor: number, idCivility: number, idPieceType: number, idFamilySituation: number, idCountry: number):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + 'users/admin/sponsor/' + idSponsor + '/civility/' + idCivility + '/pieceType/' + idPieceType + '/situation/' + idFamilySituation + '/country/' + idCountry, admin, httpOptions);
  }

  createMember(member: User, idSponsor: number, idCivility: number, idPieceType: number, idFamilySituation: number, idCountry: number):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + 'users/member/sponsor/' + idSponsor + '/civility/' +idCivility + '/pieceType/'+ idPieceType + '/situation/' + idFamilySituation + '/country/' + idCountry, member, httpOptions);
  }

  createMutualist(mutualist: User, idSponsor: number, idCivility: number, idPieceType: number, idFamilySituation: number, idCountry: number):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + 'users/mutualist/sponsor/' +idSponsor + '/civility/' + idCivility + '/pieceType/' + idPieceType + '/situation/' + idFamilySituation + '/country/' + idCountry, mutualist, httpOptions);
  }

  createOperator(operator: User,  idSponsor: number, idCivility: number, idPieceType: number, idFamilySituation: number, idCountry: number):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + 'users/operator/sponsor/' + idSponsor + '/civility/' + idCivility + '/pieceType/' + idPieceType + "/situation/" + idFamilySituation + '/country/' + idCountry, operator, httpOptions);
  }
  countAllUsers(): Observable<any[]>{
    return this.httpClient.get<any[]>(this.baseUrl + 'users/all', httpOptions);
  }

  addMemberToClub(idClub: MemberComponent, idMember: number): Observable<any[]>{
    return this.httpClient.get<any[]>(this.baseUrl + 'clubs/' + idClub + '/add-member/' + idMember, httpOptions);
  }

  addPilotToClub(idClub: MemberComponent, idPilot: number): Observable<any[]>{
    return this.httpClient.get<any[]>(this.baseUrl + 'clubs/' + idClub + '/add-pilot/' + idPilot, httpOptions);
  }

  getAllMambers():Observable<any>{
    return this.httpClient.get<any[]>(this.baseUrl + 'users/member', httpOptions);
  }
  getAllMutualists():Observable<any>{
    return this.httpClient.get<any[]>(this.baseUrl + 'users/mutualist', httpOptions);
  }
  getAllAdmins():Observable<any>{
    return this.httpClient.get<any[]>(this.baseUrl + 'users/admin', httpOptions);
  }

  getUserByEmail(email: string):Observable<any>{
    return this.httpClient.get<any[]>(this.baseUrl + 'users/by-email/'+ email, httpOptions);
  }

  addSponsoredMember(idUser: number, idMember: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `users/${idUser}/add-sponsored-member/${idMember}`, {}, httpOptions);
  }

  addBeneficiary(idUser: number, idPieceType: number, beneficiary: Beneficiary):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `users/${idUser}/add-beneficiary/pieceType/${idPieceType}`, beneficiary, httpOptions);
  }

  changeUserStatus(idUser: number, idStatus: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `users/${idUser}/status/${idStatus}`, {}, httpOptions);
  }

  findUsersByLastName(lastName: string):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'users/search?lastName='+ lastName, httpOptions);
  }
}
