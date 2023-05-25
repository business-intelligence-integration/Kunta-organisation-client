import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FamilySituation } from '../../classes/familySituation';
import { UtilityService } from '../utility/utility.service';

const httpOptions ={
  headers: new HttpHeaders({
    'content-type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class FamilySituationService {

  private baseUrl = environment.baseUrlApi
  constructor(private httpClient: HttpClient, private utilityService: UtilityService){
    httpOptions.headers = httpOptions.headers.set('Authorization', "Bearer " + this.utilityService.loadToken())
  }

  findAllFamilySituations():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'family-situations', httpOptions);
  }

  createFamilySituation(familySituation: FamilySituation):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + 'family-situations/', familySituation, httpOptions);
  } 

  findFamilySituationById(idFamilySituation: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'family-situations/'+ idFamilySituation, httpOptions);
  }

  updateFamilySituation(idFamilySituation: number, familySituation: FamilySituation):Observable<any>{
    return this.httpClient.put<any>(this.baseUrl + 'family-situations/'+ idFamilySituation, familySituation, httpOptions);
  }

  deleteFamilySituation(idFamilySituation: number):Observable<any>{
    return this.httpClient.delete<any>(this.baseUrl + 'family-situations/'+ idFamilySituation, httpOptions);
  }

  findFamilySituationByLabel(label: string):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'family-situations/search?label=' + label, httpOptions);
  }
}
