import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UtilityService } from '../utility/utility.service';
import { UserCategory } from '../../classes/userCategory';

const httpOptions ={
  headers: new HttpHeaders({
    'content-type':'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class UserCategoryService {

  private baseUrl = environment.baseUrlApi
  private headers = new HttpHeaders;

  constructor(private httpClient: HttpClient, private utilityService: UtilityService){
    httpOptions.headers = httpOptions.headers.set('Authorization', "Bearer " + this.utilityService.loadToken())
  }

  getAllUsersCategory():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'user-categories', httpOptions);
  }

  createUserCategory(category: UserCategory):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + 'user-categories', category, httpOptions);
  }

  findUsersCategoryById(idCategory: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'user-categories/' + idCategory, httpOptions);
  }

  updateUserCategory(category: UserCategory, idCategory: number):Observable<any>{
    return this.httpClient.put<any>(this.baseUrl + 'user-categories/' + idCategory, category, httpOptions);
  }

  deleteUserCategory(idCategory: number):Observable<any>{
    return this.httpClient.delete<any>(this.baseUrl + 'user-categories/' + idCategory, httpOptions);
  }
  
  findUserCategoryByName(name: string):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'user-categories/search?name=' + name, httpOptions);
  }

}
