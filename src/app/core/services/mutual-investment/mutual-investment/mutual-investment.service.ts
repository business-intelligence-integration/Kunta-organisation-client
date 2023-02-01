import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MutualInvestment } from 'src/app/core/classes/mutualInvestment';
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
export class MutualInvestmentService {

  private baseUrl = environment.baseUrlApiActivity
  constructor(private httpClient: HttpClient, private utilityService: UtilityService){
    httpOptions.headers = httpOptions.headers.set('Authorization', "Bearer " + this.utilityService.loadToken())
  }

  findAllMutualInvestments():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'mutual-investments', httpOptions);
  }

  createMutualInvestment(mutualInvestment: MutualInvestment):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + 'mutual-investments', mutualInvestment, httpOptions);
  }

  findMutualInvestmentById(idInvestment: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'mutual-investments/'+ idInvestment, httpOptions);
  }

  updateMutualInvestment(mutualInvestment: MutualInvestment, idType: number):Observable<any>{
    return this.httpClient.put<any>(this.baseUrl + 'mutual-investments/'+ idType, mutualInvestment, httpOptions);
  }

  deleteMutualInvestment(idInvestment: number):Observable<any>{
    return this.httpClient.delete<any>(this.baseUrl + 'mutual-investments/'+ idInvestment, httpOptions);
  }

  generateRefundDates(idInvestment: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + 'mutual-investments/'+ idInvestment + "/generate-refund-dates", {}, httpOptions);
  }

  setRefundDatesManually(idInvestment: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + 'mutual-investments/'+ idInvestment + "/set-refund-dates-manually", {}, httpOptions);
  }

  updateInvestmentAllocationKey(idInvestment: number, idAllocationKey: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + 'mutual-investments/'+ idInvestment + "/update-allocation-key/" + idAllocationKey, {}, httpOptions);
  }
}
