import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatsPage } from './chats.page';
import {ChatPage} from "../chat/chat.page";

const routes: Routes = [
  {
    path: '',
    component: ChatsPage
  },
  {
    path: ':chatId',
    component: ChatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatsPageRoutingModule {}
