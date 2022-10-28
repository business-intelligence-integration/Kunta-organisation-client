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
}
