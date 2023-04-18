import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UtilityService } from '../../utility/utility.service';
import { Subscription } from 'src/app/core/classes/subscription';

const httpOptions ={
  headers: new HttpHeaders({
    'content-type':'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private baseUrl = environment.baseUrlApiActivity
  constructor(private httpClient: HttpClient, private utilityService: UtilityService){
    httpOptions.headers = httpOptions.headers.set('Authorization', "Bearer " + this.utilityService.loadToken())
  }

  createSubscription( subscription: Subscription,idSubscriptionOffer: number, idSubscriber: number, idRiskProfile: number):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + 'subscriptions/subscription-offer/' + idSubscriptionOffer + "/subscriber/" + idSubscriber + "/risk-profile/" + idRiskProfile + '?token=' + this.utilityService.loadToken(), subscription);
  }

}
