import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Organism } from '../../classes/organism';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  private baseUrl = environment.baseUrlApi

  constructor(private httpClient: HttpClient) {}
  
  findAllAreas():Observable<Organism[]>{
    return this.httpClient.get<Organism[]>(this.baseUrl + 'areas');
  }

  createArea(area: Organism):Observable<Organism>{
    return this.httpClient.post<Organism>(this.baseUrl + 'areas', area);
  }

  getAreaById(id: number):Observable<Organism>{
    return this.httpClient.get<Organism>(this.baseUrl + 'areas/'+ id, {});
  }

  updateAreaById(area: Organism, id: number):Observable<Organism>{
    return this.httpClient.put<Organism>(this.baseUrl + 'areas/'+ id, area);
  }

  deleteAreaById(id: number):Observable<Organism>{
    return this.httpClient.delete<Organism>(this.baseUrl + 'areas/'+ id, {});
  }
}
