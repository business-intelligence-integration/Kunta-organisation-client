import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Status } from 'src/app/core/classes/status';
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
export class StatusService {

  private baseUrl = environment.baseUrlApi
  constructor(private httpClient: HttpClient, private utilityService: UtilityService){
    httpOptions.headers = httpOptions.headers.set('Authorization', "Bearer " + this.utilityService.loadToken())
  }

  findAllStatus():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'status', httpOptions);
  }

  findTontineById(idStatus: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'status/'+ idStatus, httpOptions);
  }

  updateStatus(idStatus: number, status: Status):Observable<any>{
    return this.httpClient.put<any>(this.baseUrl + 'status/'+ idStatus, status, httpOptions);
  }

  deleteStatus(idStatus: number):Observable<any>{
    return this.httpClient.delete<any>(this.baseUrl + 'status/'+ idStatus, httpOptions);
  }
}
