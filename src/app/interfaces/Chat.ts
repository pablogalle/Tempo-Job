import {ChatMessage} from "./ChatMessage";

export interface Chat{
  _id?: string
  users: {
    appliant: {
      username: string,
      userId: string
    },
    contractor: {
      username: string,
      userId: string
    }
  }
  messages? : ChatMessage[]
}
