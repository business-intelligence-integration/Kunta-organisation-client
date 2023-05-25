import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PieceType } from '../../classes/pieceType';
import { UtilityService } from '../utility/utility.service';

const httpOptions ={
  headers: new HttpHeaders({
    'content-type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class PieceTypeService {

  private baseUrl = environment.baseUrlApi
  constructor(private httpClient: HttpClient, private utilityService: UtilityService){
    httpOptions.headers = httpOptions.headers.set('Authorization', "Bearer " + this.utilityService.loadToken())
  }

  findAllPieceTypes():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'piece-types', httpOptions);
  }

  createPieceType(label: string):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + 'piece-types?label=' + label, {}, httpOptions);
  } 

  findPieceTypeById(idPieceType: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'piece-types/'+ idPieceType, httpOptions);
  }

  updatePieceType(idPieceType: number, pieceType: PieceType):Observable<any>{
    return this.httpClient.put<any>(this.baseUrl + 'piece-types/'+ idPieceType, pieceType, httpOptions);
  }

  deletePieceType(idPieceType: number):Observable<any>{
    return this.httpClient.delete<any>(this.baseUrl + 'piece-types/'+ idPieceType, httpOptions);
  }
  
  findPieceTypeByLabel(label: string):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'piece-types/search?label=' + label, httpOptions);
  }
}
