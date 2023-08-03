import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UtilityService } from '../utility/utility.service';
import { Assistance } from '../../classes/assistance';
import { DistributionPercentage } from '../../classes/distributionPercentage';
import { SecurityDeposit } from '../../classes/securityDeposit';

const httpOptions ={
  headers: new HttpHeaders({
    'content-type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AssistanceService {

  private baseUrl = environment.baseUrlApiActivity
  constructor(private httpClient: HttpClient, private utilityService: UtilityService){
    httpOptions.headers = httpOptions.headers.set('Authorization', "Bearer " + this.utilityService.loadToken())
  }

  findAllAssistances():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'assistance', httpOptions);
  }

  findAssistanceById(idAssistance: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'assistance/' + idAssistance, httpOptions);
  }

  deleteAssistance(idAssistance: number):Observable<any>{
    return this.httpClient.delete<any>(this.baseUrl + 'assistance/' + idAssistance, httpOptions);
  }

  addSecurityDeposit(idAssistance: number, idUser: number, securityDeposit: SecurityDeposit):Observable<any>{
    console.log("idUSer:: ", idUser, "Security Amount::", securityDeposit);
    
    return this.httpClient.post<any>(this.baseUrl + 'assistance/' + idAssistance + '/add-security-deposit/user/' + idUser + "?token=" + this.utilityService.loadToken(), securityDeposit);
  }

  createAssistance(assistance: Assistance, idApplicant: number, idClub: number, idFrequency: number, idProfitabilityType: number, idRefundType: number, isAware: boolean):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + 'assistance/applicant/' + idApplicant + '/club/' + idClub + '/refund-type/' + idRefundType + '/profitability-type/' + idProfitabilityType + '?idFrequency=' + idFrequency + '&isAware=' + isAware + '&token=' + this.utilityService.loadToken(), assistance);
  }

  applyDistributionPercentage(distributionPercentage: DistributionPercentage, idAssistance: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + 'assistance/apply-distribution-percentage/' + idAssistance, distributionPercentage);
  }

}
