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
export class PostService {

  private baseUrl = environment.baseUrlApi
  constructor(private httpClient: HttpClient, private utilityService: UtilityService){
    httpOptions.headers = httpOptions.headers.set('Authorization', "Bearer " + this.utilityService.loadToken())
  }

  findAllPosts():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'posts', httpOptions);
  }

  findPostById(idPost: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'posts/'+ idPost, httpOptions);
  }

  updatePost(post: Post, id: number):Observable<any>{
    return this.httpClient.put<any>(this.baseUrl + 'posts/'+ id, post, httpOptions);
  }

  createPost(post: Post):Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + 'posts', post, httpOptions);
  } 

  deletePost(idPost: number):Observable<any>{
    return this.httpClient.delete<any>(this.baseUrl + 'posts/'+ idPost, httpOptions);
  }

  findAllPostsByOrganisationLevel(organisationLevel: string):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'posts/find/'+ organisationLevel, httpOptions);
  }

  finAllPostByIdMainOffice(idMainOffice: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'posts/findMainOffice/'+ idMainOffice, httpOptions);
  }

  finAllPostByIdCenter(idCenter: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'posts/findCenter/'+ idCenter, httpOptions);
  }

  finAllPostByIdArea(idArea: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'posts/findArea/'+ idArea, httpOptions);
  }

  finAllPostByIdClub(idClub: number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'posts/findClub/'+ idClub, httpOptions);
  }

  addOperatorToPost(idOperator: number, idPost: number, idFunction: number):Observable<any>{
    return this.httpClient.patch<any>(this.baseUrl + "posts/add-operator?idOperator=" + idOperator + "&idPost=" + idPost + "&idFunction=" + idFunction, {}, httpOptions);
  }
}
