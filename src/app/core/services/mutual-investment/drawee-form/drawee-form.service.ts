import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DroweeForm } from 'src/app/core/classes/droweeForm';
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
export class DraweeFormService {

  private baseUrl = environment.baseUrlApiActivity
  constructor(private httpClient: HttpClient, private utilityService: UtilityService){
    httpOptions.headers = httpOptions.headers.set('Authorization', "Bearer " + this.utilityService.loadToken())
  }

  findAllDraweeForm():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'drawee-forms', httpOptions);
  }

  createDraweeForm(droweeForm: DroweeForm):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + 'drawee-forms', droweeForm, httpOptions);
  }

  findDraweeFormById(idForm: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'drawee-forms/'+ idForm, httpOptions);
  }

  updateDraweeForm(droweeForm: DroweeForm, id: number):Observable<any>{
    console.log("droweeForm::2", droweeForm);
    
    return this.httpClient.put<any>(this.baseUrl + 'drawee-forms/'+ id, droweeForm, httpOptions);
  }

  deleteDraweeForm(idForm: number):Observable<any>{
    return this.httpClient.delete<any>(this.baseUrl + 'drawee-forms/'+ idForm, httpOptions);
  }
}
