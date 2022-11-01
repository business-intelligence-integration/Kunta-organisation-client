import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Organism } from '../../classes/organism';
import { UtilityService } from '../utility/utility.service';

const httpOptions ={
  headers: new HttpHeaders({
    'content-type':'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class CenterService {

  private baseUrl = environment.baseUrlApi

  constructor(private httpClient: HttpClient, private utilityService: UtilityService) {
    httpOptions.headers = httpOptions.headers.set('Authorization', "Bearer " + this.utilityService.loadToken())
  }

  findAllCenters():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'centers', httpOptions);
  }

  createCenter(center: Organism):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + 'centers', center, httpOptions);
  }

  getCenterById(id: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'centers/'+ id,httpOptions);
  }

  updateCenterById(center: Organism, id: number):Observable<any>{
    return this.httpClient.put<any>(this.baseUrl + 'centers/'+ id, center, httpOptions);
  }

  deleteCenterById(id: number):Observable<any>{
    return this.httpClient.delete<any>(this.baseUrl + 'centers/'+ id,httpOptions);
  }

  addAreaToCenter(idCenter: number, idArea: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `centers/${idCenter}/add-area/${idArea}`, {}, httpOptions);
  }
}
