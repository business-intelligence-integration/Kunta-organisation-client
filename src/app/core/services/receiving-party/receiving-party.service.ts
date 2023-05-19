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
export class ReceivingPartyService {

  private baseUrl = environment.baseUrlApiActivity
  constructor(private httpClient: HttpClient, private utilityService: UtilityService){
    httpOptions.headers = httpOptions.headers.set('Authorization', "Bearer " + this.utilityService.loadToken())
  }

  findAllReceivingParties():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'receiving-parties', httpOptions);
  }

  findReceivingPartyById(idReceivingParty: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'receiving-parties/' + idReceivingParty, httpOptions);
  }
}
