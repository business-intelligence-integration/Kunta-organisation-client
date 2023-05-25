import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Gain } from '../../classes/gain';
import { UtilityService } from '../utility/utility.service';

const httpOptions ={
  headers: new HttpHeaders({
    'content-type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class GainService {

  private baseUrl = environment.baseUrlApiActivity
  constructor(private httpClient: HttpClient, private utilityService: UtilityService){
    httpOptions.headers = httpOptions.headers.set('Authorization', "Bearer " + this.utilityService.loadToken())
  }

  findAllGainModes():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'gain-modes', httpOptions);
  }

  createGainMode(gain: Gain):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + 'gain-modes', gain, httpOptions);
  }

  findGainModeById(id: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'gain-modes/'+ id, httpOptions);
  }

  updateGainMode(gain: Gain, id: number):Observable<any>{
    return this.httpClient.put<any>(this.baseUrl + 'gain-modes/'+ id, gain, httpOptions);
  }

  deleteGainMode(id: number):Observable<any>{
    return this.httpClient.delete<any>(this.baseUrl + 'gain-modes/'+ id, httpOptions);
  }
  
  findGainModeByLabel(label: string):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'gain-modes/search?label=' + label, httpOptions);
  }
}
