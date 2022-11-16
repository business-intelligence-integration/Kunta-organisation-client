import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Frequency } from '../../classes/frequency';
import { UtilityService } from '../utility/utility.service';

const httpOptions ={
  headers: new HttpHeaders({
    'content-type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class FrequencyService {

  private baseUrl = environment.baseUrlApi
  constructor(private httpClient: HttpClient, private utilityService: UtilityService){
    httpOptions.headers = httpOptions.headers.set('Authorization', "Bearer " + this.utilityService.loadToken())
  }

  
  findAllFrequencies():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'frequencies', httpOptions);
  }

  createFrequency(frequency: Frequency):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + 'frequencies', frequency, httpOptions);
  }

  getFrequencyById(id: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'frequencies/'+ id, httpOptions);
  }

  updateFrequency(frequency: Frequency, id: number):Observable<any>{
    return this.httpClient.put<any>(this.baseUrl + 'frequencies/'+ id, frequency, httpOptions);
  }

  deleteFrequency(id: number):Observable<any>{
    return this.httpClient.delete<any>(this.baseUrl + 'frequencies/'+ id, httpOptions);
  }
}
