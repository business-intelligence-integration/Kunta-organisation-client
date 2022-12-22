import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '../../classes/country';
import { UtilityService } from '../utility/utility.service';

const httpOptions ={
  headers: new HttpHeaders({
    'content-type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private baseUrl = environment.baseUrlApi
  constructor(private httpClient: HttpClient, private utilityService: UtilityService) {
    httpOptions.headers = httpOptions.headers.set('Authorization', "Bearer " + this.utilityService.loadToken())
  }

  findAllCountries():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'countries', httpOptions);
  }

  createCountry(country: Country):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + 'countries',country, httpOptions);
  }

  findCountryByID(idCountry: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'countries/'+ idCountry, httpOptions);
  }

  updateCountry(country: Country, idCountry: number):Observable<any>{
    return this.httpClient.put<any>(this.baseUrl + 'countries/'+ idCountry, country, httpOptions);
  }

  deleteCountry(id: number):Observable<any>{
    return this.httpClient.delete<any>(this.baseUrl + 'countries/'+ id, httpOptions);
  }

}
