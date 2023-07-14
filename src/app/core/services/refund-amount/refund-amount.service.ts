import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UtilityService } from '../utility/utility.service';

const httpOptions ={
  headers: new HttpHeaders({
    'content-type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class RefundAmountService {

  public baseUrl = environment.baseUrlApiActivity
  constructor(private httpClient: HttpClient, private utilityService: UtilityService){
    httpOptions.headers = httpOptions.headers.set('Authorization', "Bearer " + this.utilityService.loadToken())
  }

  findRefundAmountById(idRefundAmount: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'refund-amount/'+ idRefundAmount, httpOptions);
  }

  findPictureByIdRefundAmount(idRefundAmound: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'refund-amount/find-refunt-amount-picture?idRefundAmound=' + idRefundAmound);
  }

  uploadRefundAmountPicture(picture: FormData, idRefundAmound: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + 'refund-amount/upload-picture?idRefundAmound=' + idRefundAmound, picture);
  }
}
