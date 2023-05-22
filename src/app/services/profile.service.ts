import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserProfile} from "../interfaces/UserProfile";
import {Job} from "../interfaces/Job";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  URI = environment.ApiURI
  constructor(private http: HttpClient) { }

  getUser(id: string){
    return this.http.get<UserProfile>(this.URI+'users/'+id);
  }

  getJobsOfUser(id: string): Observable<Job[]>{
    return this.http.get<Job[]>(this.URI+'jobs/'+id);
  }
}
