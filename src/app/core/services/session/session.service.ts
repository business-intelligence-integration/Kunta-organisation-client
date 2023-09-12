import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Payment } from '../../classes/payment';
import { Penality } from '../../classes/penality';
import { Session } from '../../classes/session';
import { UtilityService } from '../utility/utility.service';

const httpOptions ={
  headers: new HttpHeaders({
    'content-type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private baseUrl = environment.baseUrlApiActivity
  constructor(private httpClient: HttpClient, private utilityService: UtilityService){
    httpOptions.headers = httpOptions.headers.set('Authorization', "Bearer " + this.utilityService.loadToken())
  }

  findAllSessions():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'sessions');
  }

  findSessionById(id: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'sessions/'+ id);
  }

  updateSession(session: Session, id: number):Observable<any>{
    return this.httpClient.put<any>(this.baseUrl + 'sessions/'+ id, session);
  }

  createPaymentForSession(payment: Payment, idSession: number, idUser: number, idPaymentMethod: number):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + 'sessions/' + idSession + '/payment/user/' + idUser + '/payment-method/' + idPaymentMethod + "?token=" + this.utilityService.loadToken(), payment);
  } 

  createPenaltyForSession(penalty: Penality, idSession: number, idPenaltyType: number, idUser: number):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + 'sessions/' + idSession + '/penalty/penalty-type/' + idPenaltyType + "/user/" + idUser + "?token=" + this.utilityService.loadToken(), penalty);
  } 

  findAllPaymentsOfASession(idSession: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'sessions/'+ idSession + '/all-payments');
  }

  updateContributionDeadline(session: Session, idSession: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `sessions/${idSession}/contribution-deadline`, session);
  }

  createSecondTimePayment(idSession: number, idPayment: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `sessions/${idSession}/re-payment/last-payment/${idPayment}`, {});
  }

  findUserPaymentStateByUserIdAndSession(idSession: number, idUser: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'sessions/'+ idSession + '/payment-state/user/' + idUser);
  }

  findAllUserPaymentStateBySession(idSession: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'sessions/'+ idSession + '/payment-states');
  }
 
  findPenaltiesOfASession(idSession: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'sessions/'+ idSession + '/all-penalties');
  }

  closeSessionById(idSession: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `sessions/${idSession}/close`, {});
  }

  openSessionById(idSession: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `sessions/${idSession}/open`, {});
  }

  generateWinnerOfASession(idSession: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `sessions/${idSession}/generate-winner` + '?token=' + this.utilityService.loadToken(), {});
  }

  transferContributionsToTheSolidarityFund(idSession: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `sessions/${idSession}/transfer-contributions-to-solidarity-fund` + '?token=' + this.utilityService.loadToken(), {});
  }
}
