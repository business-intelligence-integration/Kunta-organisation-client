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
export class FonctionService {

  private baseUrl = environment.baseUrlApi
  constructor(private httpClient: HttpClient, private utilityService: UtilityService) {
    httpOptions.headers = httpOptions.headers.set('Authorization', "Bearer " + this.utilityService.loadToken())
  }

  findAllFunctions():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'functions', httpOptions);
  }

  createFunction(functions: Function):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + 'functions', functions, httpOptions);
  }

  findFunctionById(idFunction: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'functions/'+ idFunction, httpOptions);
  }

  updateFunction(functions: Function, idFunction: number):Observable<any>{
    return this.httpClient.put<any>(this.baseUrl + 'functions/'+ idFunction, functions, httpOptions);
  }

  deleteFunction(id: number):Observable<any>{
    return this.httpClient.delete<any>(this.baseUrl + 'functions/'+ id, httpOptions);
  }
}
