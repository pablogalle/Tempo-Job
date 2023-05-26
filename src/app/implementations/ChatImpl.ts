import {Chat} from "../interfaces/Chat";

export class ChatImpl implements Chat {
  users: { appliant: { username: string; userId: string }; contractor: { username: string; userId: string } };


  constructor(users: { appliant: { username: string; userId: string }; contractor: { username: string; userId: string } }) {
    this.users = users;
  }
}
