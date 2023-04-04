import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CycleDto } from '../../classes/cycleDto';
import { Tontine } from '../../classes/tontine';
import { UtilityService } from '../utility/utility.service';

const httpOptions ={
  headers: new HttpHeaders({
    'content-type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TontineService {
  private baseUrl = environment.baseUrlApiActivity
  constructor(private httpClient: HttpClient, private utilityService: UtilityService){
    httpOptions.headers = httpOptions.headers.set('Authorization', "Bearer " + this.utilityService.loadToken())
  }

  findAllTontines():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'tontines?token=' + this.utilityService.loadToken());
  }

  createNewTontine(tontine: Tontine, idClub: number, idLevel: number, idContributionFrequency: number, idSessionFrequency: number, idGain: number):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + 'tontines/club/' + idClub + '/level/' + idLevel + '/contributionFrequency/' + idContributionFrequency + '/sessionFrequency/' + idSessionFrequency + '/gain-mode/' + idGain + '?token='+ this.utilityService.loadToken(), tontine);
  }

  updateTontine(tontine: Tontine, idTontine: number):Observable<any>{
    return this.httpClient.put<any>(this.baseUrl + 'tontines/'+ idTontine, tontine);
  }

  findTontineById(id: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'tontines/'+ id);
  }

  deleteTontineById(id: number):Observable<any>{
    return this.httpClient.delete<any>(this.baseUrl + 'tontines/'+ id + "?token=" + this.utilityService.loadToken());
  }

  addParticipant(idTontine: number, idUser: number, planValue: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `tontines/${idTontine}/add-participant/${idUser}/plan/${planValue}` + "?token=" +this.utilityService.loadToken(), {});
  }

  removeParticipant(idTontine: number, idUser: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `tontines/${idTontine}/remove-participant/${idUser}`, {});
  }

  setFrequency(idTontine: number, idFrequency: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `tontines/${idTontine}/set-frequency/${idFrequency}`, {});
  }

  setLevel(idTontine: number, idLevel: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `tontines/${idTontine}/set-transversality-level/${idLevel}`, {});
  }

  getTontineUsers(idTontine: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'tontines/'+ idTontine + '/users');
  }

  createCycleForTontine(idTontine: number, cycle: CycleDto):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + 'tontines/' + idTontine + "/cycles", cycle);
  }

  setStatus(idTontine: number, idStatus: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `tontines/${idTontine}/status/${idStatus}`, {});
  }

  findAllCyclesOfTontine(idTontine: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'tontines/'+ idTontine + '/cycles');
  }

  findTontineByName(name: string):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'tontines/search?name='+ name, httpOptions);
  }
}
