import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfitabilityType } from 'src/app/core/classes/profitabilityType';
import { environment } from 'src/environments/environment';
import { UtilityService } from '../../utility/utility.service';
const httpOptions ={
  headers: new HttpHeaders({
    'content-type':'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class ProfitabilityTypeService {

  private baseUrl = environment.baseUrlApiActivity
  constructor(private httpClient: HttpClient, private utilityService: UtilityService){
    httpOptions.headers = httpOptions.headers.set('Authorization', "Bearer " + this.utilityService.loadToken())
  }

  findAllProfitabilityTypes():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'profitability-types', httpOptions);
  }

  findProfitabilityTypeById(idType: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'profitability-types/'+ idType, httpOptions);
  }

  updateProfitabilityType(refundType: ProfitabilityType, idType: number):Observable<any>{
    return this.httpClient.put<any>(this.baseUrl + 'profitability-types/'+ idType, refundType, httpOptions);
  }

  deleteProfitabilityType(idType: number):Observable<any>{
    return this.httpClient.delete<any>(this.baseUrl + 'profitability-types/'+ idType, httpOptions);
  }
}
