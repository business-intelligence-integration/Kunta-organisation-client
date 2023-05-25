import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Level } from '../../classes/level';
import { UtilityService } from '../utility/utility.service';

const httpOptions ={
  headers: new HttpHeaders({
    'content-type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TransversalityLevelService {

  private baseUrl = environment.baseUrlApiActivity
  constructor(private httpClient: HttpClient, private utilityService: UtilityService){
    httpOptions.headers = httpOptions.headers.set('Authorization', "Bearer " + this.utilityService.loadToken())
  }

  findAllLevels():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'transversality-levels', httpOptions);
  }

  createLevel(level: Level):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + 'transversality-levels', level, httpOptions);
  }

  findLevelById(id: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'transversality-levels/'+ id, httpOptions);
  }

  updateLevel(level: Level, id: number):Observable<any>{
    return this.httpClient.put<any>(this.baseUrl + 'transversality-levels/'+ id, level, httpOptions);
  }

  deleteLevel(id: number):Observable<any>{
    return this.httpClient.delete<any>(this.baseUrl + 'transversality-levels/'+ id, httpOptions);
  }

  findTransversalityLevelByLabel(label: string):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'transversality-levels/search?label=' + label, httpOptions);
  }

}
