import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Civility } from '../../classes/civility';
import { UtilityService } from '../utility/utility.service';

const httpOptions ={
  headers: new HttpHeaders({
    'content-type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class CivilityService {

  private baseUrl = environment.baseUrlApi
  constructor(private httpClient: HttpClient, private utilityService: UtilityService){
    httpOptions.headers = httpOptions.headers.set('Authorization', "Bearer " + this.utilityService.loadToken())
  }


  findAllCivilities():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'civilities', httpOptions);
  }

  createCivility(civility: Civility):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + 'civilities/', civility, httpOptions);
  } 

  findCivilityById(idCivility: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'civilities/'+ idCivility, httpOptions);
  }

  updateCivility(idCivility: number, civility: Civility):Observable<any>{
    return this.httpClient.put<any>(this.baseUrl + 'civilities/'+ idCivility, civility, httpOptions);
  }

  deletePieceType(idCivility: number):Observable<any>{
    return this.httpClient.delete<any>(this.baseUrl + 'civilities/'+ idCivility, httpOptions);
  }
}
