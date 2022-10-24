import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Organism } from '../../classes/organism';

@Injectable({
  providedIn: 'root'
})
export class CenterService {

  private baseUrl = environment.baseUrlApi

  constructor(private httpClient: HttpClient) {}

  findAllCenters():Observable<Organism[]>{
    return this.httpClient.get<Organism[]>(this.baseUrl + 'centers');
  }

  createCenter(center: Organism):Observable<Organism>{
    return this.httpClient.post<Organism>(this.baseUrl + 'centers', center);
  }

  getCenterById(id: number):Observable<Organism>{
    return this.httpClient.get<Organism>(this.baseUrl + 'centers/'+ id, {});
  }

  updateCenterById(center: Organism, id: number):Observable<Organism>{
    return this.httpClient.put<Organism>(this.baseUrl + 'centers/'+ id, center);
  }

  deleteCenterById(id: number):Observable<Organism>{
    return this.httpClient.delete<Organism>(this.baseUrl + 'centers/'+ id, {});
  }
}
