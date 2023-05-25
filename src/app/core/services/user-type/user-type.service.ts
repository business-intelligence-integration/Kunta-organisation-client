import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UtilityService } from '../utility/utility.service';
import { UserType } from '../../classes/userType';

const httpOptions ={
  headers: new HttpHeaders({
    'content-type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserTypeService {

  private baseUrl = environment.baseUrlApi
  private headers = new HttpHeaders;

  constructor(private httpClient: HttpClient, private utilityService: UtilityService){
    httpOptions.headers = httpOptions.headers.set('Authorization', "Bearer " + this.utilityService.loadToken())
  }

  getAllUsersType():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'user-types', httpOptions);
  }

  createUserType(type: UserType):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + 'user-types', type, httpOptions);
  }

  findUsersTypeById(idType: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'user-types/' + idType, httpOptions);
  }

  updateUserType(type: UserType, idType: number):Observable<any>{
    return this.httpClient.put<any>(this.baseUrl + 'user-types/' + idType, type, httpOptions);
  }

  deleteUserType(idType: number):Observable<any>{
    return this.httpClient.delete<any>(this.baseUrl + 'user-types/' + idType, httpOptions);
  }
  
  findUserTypeByLabel(label: string):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'user-types/search?label=' + label, httpOptions);
  }

}
