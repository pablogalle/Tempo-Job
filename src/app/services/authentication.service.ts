import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {UserAuth} from "../interfaces/UserAuth";
import {Observable} from "rxjs";
import {Storage} from "@ionic/storage-angular";

const USER_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  URI = environment.ApiURI;

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) {

    this.init();
  }

  postAuth(userAuth: UserAuth): Observable<HttpResponse<UserAuth>> {
    return this.http.post<UserAuth>(this.URI + 'auth/authenticate/', userAuth, {observe: 'response'});
  }

  async init() {
    await this.storage.create();

  }

  async setLoggedInUser(user: UserAuth) {
    await this.storage.set(USER_KEY, user);

  }

  async getLoggedInUser(): Promise<UserAuth> {
    return await this.storage.get(USER_KEY);
  }

  async clearLoggedInUser() {
    await this.storage.remove(USER_KEY);
  }
}
