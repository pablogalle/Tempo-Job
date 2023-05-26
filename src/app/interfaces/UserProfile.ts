import {UserRegister} from "./UserRegister";

export interface UserProfile extends UserRegister{
  id?: string,
  scores?: {
    username: string,
    score: string
  }
  chats?:[{
    chatId: string,
    username: string
  }]
}
