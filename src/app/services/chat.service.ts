import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Chat} from "../interfaces/Chat";
import {Job} from "../interfaces/Job";
import {ChatMessage} from "../interfaces/ChatMessage";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  URI = environment.ApiURI
  constructor(private http: HttpClient) { }

  createNewChat(chat: Chat):Observable<Chat>{
    return this.http.post<Chat>(this.URI+'chats', chat);
  }
  sendChatMessage(message : ChatMessage, id: string){
    return this.http.post<Chat>(this.URI+'chats/'+id+'/messages', message);
}

  getMessagesFromChatId(id: string): Observable<ChatMessage[]>{
    return this.http.get<ChatMessage[]>(this.URI+'chats/'+id+'/messages');
  }
  getChatsFromUserId(userId: string): Observable<Chat[]>{
    return this.http.get<Chat[]>(this.URI+'chats/'+userId);
  }
}
