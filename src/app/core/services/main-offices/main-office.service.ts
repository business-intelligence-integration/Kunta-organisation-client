import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Organism } from '../../classes/organism';

@Injectable({
  providedIn: 'root'
})
export class MainOfficeService {

  private baseUrl = environment.baseUrlApi

  constructor(private httpClient: HttpClient) {}
  
  findAllOffices():Observable<Organism[]>{
    return this.httpClient.get<Organism[]>(this.baseUrl + 'main-office');
  }

  createMainOffice(mainOffice: Organism):Observable<Organism>{
    return this.httpClient.post<Organism>(this.baseUrl + 'main-office', mainOffice);
  }

  getById(id: number):Observable<Organism>{
    return this.httpClient.get<Organism>(this.baseUrl + 'main-office/'+ id, {});
  }

  updateOffice(mainOffice: Organism, id: number):Observable<Organism>{
    return this.httpClient.put<Organism>(this.baseUrl + 'main-office/'+ id, mainOffice);
  }

  deleteMainOffice(id: number):Observable<Organism>{
    return this.httpClient.delete<Organism>(this.baseUrl + 'main-office/'+ id, {});
  }
}
