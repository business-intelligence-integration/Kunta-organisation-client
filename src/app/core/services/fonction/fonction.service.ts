import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../../classes/post';
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

  findAllPosts():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'posts', httpOptions);
  }

  createPost(poste: Post):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + 'posts', poste, httpOptions);
  }

  findPostById(idPost: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'posts/'+ idPost, httpOptions);
  }

  updatePost(poste: Post, idPost: number):Observable<any>{
    return this.httpClient.put<any>(this.baseUrl + 'posts/'+ idPost, poste, httpOptions);
  }

  deletePost(id: number):Observable<any>{
    return this.httpClient.delete<any>(this.baseUrl + 'posts/'+ id, httpOptions);
  }
}
