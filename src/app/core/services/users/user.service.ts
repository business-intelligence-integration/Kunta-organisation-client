import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Organism } from '../../classes/organism';
import { User } from '../../classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.baseUrlApi
  constructor(private httpClient: HttpClient) {}

  getAllUsers():Observable<User[]>{
    return this.httpClient.get<User[]>(this.baseUrl + 'users');
  }

  getMemberById(id: number):Observable<User>{
    return this.httpClient.get<User>(this.baseUrl + 'users/'+ id, {});
  }

  updateMemberById(member: User, id: number):Observable<User>{
    return this.httpClient.put<User>(this.baseUrl + 'users/'+ id, member);
  }

  deleteById(id: number):Observable<User>{
    return this.httpClient.delete<User>(this.baseUrl + 'users/'+ id, {});
  }

  createAdmin(admin: User):Observable<User>{
    return this.httpClient.post<User>(this.baseUrl + 'users/admin', admin);
  }

  createMember(member: User):Observable<User>{
    return this.httpClient.post<User>(this.baseUrl + 'users/member', member);
  }

  createMutualist(mutualist: User):Observable<User>{
    return this.httpClient.post<User>(this.baseUrl + 'users/mutualist', mutualist);
  }

  createOperator(operator: User):Observable<User>{
    return this.httpClient.post<User>(this.baseUrl + 'users/operator', operator);
  }

  countAllUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>(this.baseUrl + 'users/all');
  }

}
