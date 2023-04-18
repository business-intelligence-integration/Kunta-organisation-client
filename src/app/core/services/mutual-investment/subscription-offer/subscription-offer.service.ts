import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UtilityService } from '../../utility/utility.service';
import { SubscriptionOffer } from 'src/app/core/classes/subscriptionOffer';

const httpOptions ={
  headers: new HttpHeaders({
    'content-type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class SubscriptionOfferService {
  private baseUrl = environment.baseUrlApiActivity
  constructor(private httpClient: HttpClient, private utilityService: UtilityService){
    httpOptions.headers = httpOptions.headers.set('Authorization', "Bearer " + this.utilityService.loadToken())
  }

  findAll():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'offers', httpOptions);
  }
  

  findSubscriptionOfferById(idOffer: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'offers/' + idOffer, httpOptions);
  }

  updateSubscriptionOffer( subscriptionOffer: SubscriptionOffer,idOffer: number):Observable<any>{
    return this.httpClient.put<any>(this.baseUrl + 'offers/' + idOffer, subscriptionOffer, httpOptions);
  }
  
  deleteSubscriptionOffer(idOffer: number):Observable<any>{
    return this.httpClient.delete<any>(this.baseUrl + 'offers/' + idOffer, httpOptions);
  }
}
