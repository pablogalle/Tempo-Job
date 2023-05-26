import {UserAuth} from "../interfaces/UserAuth";

export class UserAuthImpl implements UserAuth{

  password: string;
  username: string;
  userDataId: string;


  constructor(username: string, password:string, userId:string) {
    this.username = username;
    this.password = password;
    this.userDataId = userId;
  }

}
