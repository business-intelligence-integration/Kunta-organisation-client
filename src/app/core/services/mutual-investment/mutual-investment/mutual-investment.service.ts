import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MutualInvestment } from 'src/app/core/classes/mutualInvestment';
import { environment } from 'src/environments/environment';
import { UtilityService } from '../../utility/utility.service';
import { SecurityDeposit } from 'src/app/core/classes/securityDeposit';
import { SubscriptionOffer } from 'src/app/core/classes/subscriptionOffer';
import { Payment } from 'src/app/core/classes/payment';
import { FirstRefundDate } from 'src/app/core/classes/firstRefundDate';
import { Refund } from 'src/app/core/classes/refund';
import { DistributionPercentage } from 'src/app/core/classes/distributionPercentage';

const httpOptions ={
  headers: new HttpHeaders({
    'content-type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class MutualInvestmentService {

  private baseUrl = environment.baseUrlApiActivity
  constructor(private httpClient: HttpClient, private utilityService: UtilityService){
    httpOptions.headers = httpOptions.headers.set('Authorization', "Bearer " + this.utilityService.loadToken())
  }

  findAllMutualInvestments():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'mutual-investments', httpOptions);
  }

  createMutualInvestment(mutualInvestment: MutualInvestment, idDraweeForm: number, idRefundType: number, idProfitabilityType: number, idCenter: number, idFrequency: number, idMutualist: number):Observable<any>{
    console.log("mutualInvestment Orga:: ", mutualInvestment)
    return this.httpClient.post<any>(this.baseUrl + 'mutual-investments/drawee-form/' + idDraweeForm + '/refund-type/' + idRefundType + '/profitability-type/' + idProfitabilityType + '/center/' + idCenter + '?idFrequency=' + idFrequency + '&idMutualist=' + idMutualist+ '&token=' + this.utilityService.loadToken(), mutualInvestment);
  }

  findMutualInvestmentById(idInvestment: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'mutual-investments/'+ idInvestment, httpOptions);
  }

  updateMutualInvestment(mutualInvestment: MutualInvestment, idType: number):Observable<any>{
    return this.httpClient.put<any>(this.baseUrl + 'mutual-investments/'+ idType, mutualInvestment, httpOptions);
  }

  deleteMutualInvestment(idInvestment: number):Observable<any>{
    return this.httpClient.delete<any>(this.baseUrl + 'mutual-investments/'+ idInvestment + '?token=' + this.utilityService.loadToken());
  }

  generateRefundDates(idInvestment: number, firstRefundDate: FirstRefundDate):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + 'mutual-investments/'+ idInvestment + "/generate-refund-dates", firstRefundDate, httpOptions);
  }

  setRefundDatesManually(refund: Refund, idInvestment: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + 'mutual-investments/'+ idInvestment + "/set-refund-dates-manually", refund);
  }

  updateInvestmentAllocationKey(idInvestment: number, idAllocationKey: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + 'mutual-investments/'+ idInvestment + "/update-allocation-key/" + idAllocationKey, {}, httpOptions);
  }

  addSecurityDeposit(idInvestment: number, idUser: number, securityDeposit: SecurityDeposit):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + 'mutual-investments/'+ idInvestment + "/add-security-deposit/user/" + idUser + "?token=" + this.utilityService.loadToken(), securityDeposit);
  }

  deleteSecurityDeposit(idInvestment: number, idDeposit: number):Observable<any>{
    return this.httpClient.delete<any>(this.baseUrl + 'mutual-investments/'+ idInvestment + "/security-deposit/" + idDeposit, httpOptions);
  }

  createSubscriptionOffer(idInvestment: number, idProfile: number, idProfitabilityType: number, profitabilityRate: number):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + 'mutual-investments/'+ idInvestment + "/subscription-offers/new/risk-profile/" + idProfile + "/profitability-type/" + idProfitabilityType + '/' + '?profitabilityRate=' + profitabilityRate + '&token=' + this.utilityService.loadToken(), {});
  }

  releaseOperation(idInvestment: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + 'mutual-investments/release/'+ idInvestment + "?token=" + this.utilityService.loadToken(), {});
  }

  refundOfAmountsCollected(idRefund: number, idPaymentMethod: number, payment: Payment):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + 'mutual-investments/refund/'+ idRefund + '/idPaymentMethod/' + idPaymentMethod + "?token=" + this.utilityService.loadToken(), payment);
  }

  makeDistribution(idInvestment: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + 'mutual-investments/'+ idInvestment + '/make-the-distribution' + "?token=" + this.utilityService.loadToken(), {});
  }

  getDistributionPercentage(distributionPercentage: DistributionPercentage, idInvestment: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + 'mutual-investments/get-distribution-percentage/'+ idInvestment, distributionPercentage);
  }

}
