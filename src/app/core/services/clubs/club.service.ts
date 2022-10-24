import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Organism } from '../../classes/organism';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  private baseUrl = environment.baseUrlApi
  constructor(private httpClient: HttpClient) {}

  findAllClubs():Observable<Organism>{
    return this.httpClient.get<Organism>(this.baseUrl + 'clubs');
  }

  createCenter(club: Organism):Observable<Organism>{
    return this.httpClient.post<Organism>(this.baseUrl + 'clubs', club);
  }

  getclubById(id: number):Observable<Organism>{
    return this.httpClient.get<Organism>(this.baseUrl + 'clubs/'+ id, {});
  }

  updateclubById(club: Organism, id: number):Observable<Organism>{
    return this.httpClient.put<Organism>(this.baseUrl + 'clubs/'+ id, club);
  }

  deleteclubById(id: number):Observable<Organism>{
    return this.httpClient.delete<Organism>(this.baseUrl + 'clubs/'+ id, {});
  }
  
}
