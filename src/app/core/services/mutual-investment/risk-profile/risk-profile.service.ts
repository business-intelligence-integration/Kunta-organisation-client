import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UtilityService } from '../../utility/utility.service';
import { RiskProfile } from 'src/app/core/classes/riskProfile';

const httpOptions ={
  headers: new HttpHeaders({
    'content-type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class RiskProfileService {
  private baseUrl = environment.baseUrlApiActivity
  constructor(private httpClient: HttpClient, private utilityService: UtilityService){
    httpOptions.headers = httpOptions.headers.set('Authorization', "Bearer " + this.utilityService.loadToken())
  }

  findAllRiskProfiles():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'risk-profiles', httpOptions);
  }

  createRiskProfile(riskProfile: RiskProfile):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + 'risk-profiles', riskProfile, httpOptions);
  }

  findRiskProfileById(idProfile: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'risk-profiles/'+ idProfile, httpOptions);
  }

  updateRiskProfile(riskProfile: RiskProfile, idProfile: number):Observable<any>{
    return this.httpClient.put<any>(this.baseUrl + 'risk-profiles/'+ idProfile, riskProfile, httpOptions);
  }

  deleteRiskProfile(idProfile: number):Observable<any>{
    return this.httpClient.delete<any>(this.baseUrl + 'risk-profiles/'+ idProfile, httpOptions);
  }

}
