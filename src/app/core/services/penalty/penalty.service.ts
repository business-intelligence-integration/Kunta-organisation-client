import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Penality } from '../../classes/penality';
import { UtilityService } from '../utility/utility.service';

const httpOptions ={
  headers: new HttpHeaders({
    'content-type':'application/json'
  })
}


@Injectable({
  providedIn: 'root'
})
export class PenaltyService {

  private baseUrl = environment.baseUrlApiActivity
  constructor(private httpClient: HttpClient, private utilityService: UtilityService){
    httpOptions.headers = httpOptions.headers.set('Authorization', "Bearer " + this.utilityService.loadToken())
  } 

  findAllPenalties():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'penalties');
  }

  payPenalty(idPenalty: number, idUser: number, idPaymentMethod: number, penality: Penality):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `penalties/${idPenalty}/user/${idUser}/pay/payment-method/${idPaymentMethod}` + "?token=" +this.utilityService.loadToken(), penality);
  }

  findPenaltyById(idPenalty: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'penalties/' + idPenalty);
  }
}
