import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {UserAuth} from "../interfaces/UserAuth";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  URI = environment.ApiURI
  constructor(private http: HttpClient) { }

  postAuth(userAuth: UserAuth): Observable<UserAuth>{
    return this.http.post<UserAuth>(this.URI+'auth/authenticate/', userAuth);
  }

}
