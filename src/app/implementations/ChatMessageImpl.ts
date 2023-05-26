import {ChatMessage} from "../interfaces/ChatMessage";

export class ChatMessageImpl implements ChatMessage{
  messageText: string;
  senderUsername: string;
  timeSent: number;


  constructor(messageText: string, senderUsername: string, timeSent: number) {
    this.messageText = messageText;
    this.senderUsername = senderUsername;
    this.timeSent = timeSent;
  }
}
