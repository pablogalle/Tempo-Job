import {UserAuth} from "../interfaces/UserAuth";

export class UserAuthImpl implements UserAuth{
  private _id?: string| undefined;
  private _password: string;
  private _username: string;


  constructor(username: string, password:string) {
    this._username = username;
    this._password = password;
  }


  get id(): string | undefined {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }
}
