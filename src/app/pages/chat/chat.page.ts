import {Component, OnInit} from '@angular/core';
import {ChatMessage} from "../../interfaces/ChatMessage";
import {ChatService} from "../../services/chat.service";
import {ChatMessageImpl} from "../../implementations/ChatMessageImpl";
import {AuthenticationService} from "../../services/authentication.service";
import {UserAuthImpl} from "../../implementations/UserAuthImpl";
import {UserAuth} from "../../interfaces/UserAuth";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  chatId: string = '';
  userChat = ''
  chatMessages: ChatMessage[] = []
  newMessage: string = ''
  userAuth?: UserAuth ;

  constructor(
    private chatService: ChatService,
    private authService: AuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {
  }

  ngOnInit() {

    this.loadMessages()
  }

  async loadMessages() {
    this.chatId = this.activatedRoute.snapshot.paramMap.get('chatId')!;
    this.chatService.getMessagesFromChatId(this.chatId!).subscribe(
      data => {
        this.chatMessages = data
      }
    )
  }

  async sendMessage() {
    this.userAuth = await this.authService.getLoggedInUser()
    if (this.newMessage.trim() !== '') {
      const message = new ChatMessageImpl(this.newMessage, this.userAuth!.username!, Date.now());
      this.chatMessages.push(message);

      this.chatService.sendChatMessage(message, this.chatId).subscribe(
        data => {
          console.log(data)
        }
      )
      this.newMessage = '';
    }
  }

  navigateBack() {
    this.router.navigate(['tabs', 'chats'])
  }
}
