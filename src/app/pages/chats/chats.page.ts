import {Component, OnInit} from '@angular/core';
import {Chat} from "../../interfaces/Chat";
import {ChatService} from "../../services/chat.service";
import {AuthenticationService} from "../../services/authentication.service";
import {UserAuth} from "../../interfaces/UserAuth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {

  chats: Chat[] = []
  userId = '';
  filterText = '';

  constructor(
    private chatService: ChatService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadChats()
  }

  private async loadChats() {
    const userAuth: UserAuth = await this.authService.getLoggedInUser()
    this.userId = userAuth.userDataId!

    await this.chatService.getChatsFromUserId(this.userId).subscribe(
      data => {
        console.log(data)
        this.chats = data
      },
      error => {console.log(error)}
    )
  }

  navigateToChat(chat: Chat) {
    let userChat = chat.users.contractor.userId === this.userId ? chat.users.appliant.username : chat.users.contractor.username
    this.router.navigate(['/chats',chat._id], {state: {username: userChat}})
  }


  search(event: any) {
    this.filterText = event.detail.value
  }
}
