import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PenalityType } from '../../classes/penalityType';
import { UtilityService } from '../utility/utility.service';

const httpOptions ={
  headers: new HttpHeaders({
    'content-type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class PenaltyTypeService {

  private baseUrl = environment.baseUrlApiActivity
  constructor(private httpClient: HttpClient, private utilityService: UtilityService){
    httpOptions.headers = httpOptions.headers.set('Authorization', "Bearer " + this.utilityService.loadToken())
  } 

  findAllPenaltyTypes():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'penalty-types', httpOptions);
  }

  findPenaltyTypeById(idPenaltyType: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'penalty-types/'+ idPenaltyType, httpOptions);
  }

  updatePenaltyType(penalityType: PenalityType, idPenaltyType: number):Observable<any>{
    return this.httpClient.put<any>(this.baseUrl + 'penalty-types/'+ idPenaltyType, penalityType, httpOptions);
  }

  deletePenaltyType(idPenaltyType: number):Observable<any>{
    return this.httpClient.delete<any>(this.baseUrl + 'penalty-types/'+ idPenaltyType, httpOptions);
  }
  
}
