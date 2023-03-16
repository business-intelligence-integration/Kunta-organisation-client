import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RefundType } from 'src/app/core/classes/refundType';
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
export class RefundTypeService {
  private baseUrl = environment.baseUrlApiActivity
  constructor(private httpClient: HttpClient, private utilityService: UtilityService){
    httpOptions.headers = httpOptions.headers.set('Authorization', "Bearer " + this.utilityService.loadToken())
  }

  findAllRefundTypes():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'refund-type', httpOptions);
  }

  createRefundType(refundType: RefundType):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + 'refund-type', refundType, httpOptions);
  }

  findRefundTypeById(idType: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'refund-type/'+ idType, httpOptions);
  }

  updateRefundType(refundType: RefundType, idType: number):Observable<any>{
    return this.httpClient.put<any>(this.baseUrl + 'refund-type/'+ idType, refundType, httpOptions);
  }

  deleteRefundType(idType: number):Observable<any>{
    return this.httpClient.delete<any>(this.baseUrl + 'refund-type/'+ idType, httpOptions);
  }
}
