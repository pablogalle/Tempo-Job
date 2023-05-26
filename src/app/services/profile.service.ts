import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {UserProfile} from "../interfaces/UserProfile";
import {Job} from "../interfaces/Job";
import {Observable} from "rxjs";
import {UserRegister} from "../interfaces/UserRegister";
import {UserAuth} from "../interfaces/UserAuth";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  URI = environment.ApiURI
  constructor(private http: HttpClient) { }

  getUser(id: string){
    return this.http.get<UserProfile>(this.URI+'users/'+id);
  }

  createUser(user: UserRegister): Observable<HttpResponse<UserAuth>>{
    return this.http.post<UserAuth>(this.URI+'users/', user, {observe: 'response'});
  }

  getJobsOfUser(id: string): Observable<Job[]>{
    return this.http.get<Job[]>(this.URI+'jobs/userJobs/'+id);
  }

  deleteJob(id: string){
    return this.http.delete<Job[]>(this.URI+'jobs/'+id);
  }
}
