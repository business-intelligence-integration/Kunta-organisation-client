import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MemberComponent } from 'src/app/app-modules/organisation/user/member/member.component';
import { environment } from 'src/environments/environment';
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

  createAdmin(admin: User):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + 'users/admin', admin, httpOptions);
  }

  createMember(member: User):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + 'users/member', member, httpOptions);
  }

  createMutualist(mutualist: User):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + 'users/mutualist', mutualist, httpOptions);
  }

  createOperator(operator: User):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + 'users/operator', operator, httpOptions);
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


  

}
