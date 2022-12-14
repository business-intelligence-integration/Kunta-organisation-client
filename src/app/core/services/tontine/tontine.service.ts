import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cycle } from '../../classes/cycle';
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
    return this.httpClient.put<any>(this.baseUrl + 'tontines/'+ idTontine + '?token='+ this.utilityService.loadToken(), tontine);
  }

  findTontineById(id: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'tontines/'+ id + "?token=" + this.utilityService.loadToken());
  }

  deleteTontineById(id: number):Observable<any>{
    return this.httpClient.delete<any>(this.baseUrl + 'tontines/'+ id + "?token=" + this.utilityService.loadToken());
  }

  addParticipant(idTontine: number, idUser: number, planValue: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `tontines/${idTontine}/add-participant/${idUser}/plan/${planValue}` + "?token=" +this.utilityService.loadToken(), {});
  }

  removeParticipant(idTontine: number, idUser: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `tontines/${idTontine}/remove-participant/${idUser}` + "?token=" +this.utilityService.loadToken(), {});
  }

  setFrequency(idTontine: number, idFrequency: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `tontines/${idTontine}/set-frequency/${idFrequency}` + "?token=" +this.utilityService.loadToken(), {});
  }

  setLevel(idTontine: number, idLevel: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `tontines/${idTontine}/set-transversality-level/${idLevel}` + "?token=" + this.utilityService.loadToken(), {});
  }

  getTontineUsers(idTontine: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'tontines/'+ idTontine + '/users' + '?token=' + this.utilityService.loadToken());
  }

  createCycleForTontine(idTontine: number, cycle: CycleDto):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + 'tontines/' + idTontine + '/cycles?token=' + this.utilityService.loadToken(), cycle);
  }

  setStatus(idTontine: number, idStatus: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + `tontines/${idTontine}/status/${idStatus}` + "?token=" +this.utilityService.loadToken(), {});
  }

  findAllCyclesOfTontine(idTontine: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'tontines/'+ idTontine + '/cycles', httpOptions);
  }
}
