import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Job} from "../interfaces/Job";

@Injectable({
  providedIn: 'root'
})
export class JobService {
  URI = environment.ApiURI
  constructor(private http: HttpClient) { }

  getJobs(): Observable<Job[]>{
    return this.http.get<Job[]>(this.URI+'jobs');
  }
}
