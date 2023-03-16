import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../../classes/login';
import { User } from '../../classes/user';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private baseUrl = environment.baseUrlApi

  constructor(private httpClient: HttpClient) { }

  signup(user: User):Observable<User>{
    return this.httpClient.post<User>(this.baseUrl + 'auth/signup', user);
  }

  signin(login: Login):Observable<string>{
    return this.httpClient.post<string>(this.baseUrl + 'auth/login', login);
  }
}
