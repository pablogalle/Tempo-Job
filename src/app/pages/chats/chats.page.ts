import {Component, OnInit} from '@angular/core';
import {Chat} from "../../interfaces/Chat";
import {ChatService} from "../../services/chat.service";
import {AuthenticationService} from "../../services/authentication.service";
import {UserAuth} from "../../interfaces/UserAuth";
import {subway} from "ionicons/icons";
import {Router} from "@angular/router";

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {

  chats: Chat[] = []
  userId = '';

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

  navigateToChat(_id: any) {
    this.router.navigate(['/chats',_id])
  }
}
