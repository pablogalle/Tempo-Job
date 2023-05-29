import { NgModule } from '@angular/core';
import { JobsFilterPipe } from './jobs-filter.pipe';
import { ChatsFilterPipe } from './chats-filter.pipe';



@NgModule({
  declarations: [ JobsFilterPipe, ChatsFilterPipe],
  exports:[
    JobsFilterPipe,
    ChatsFilterPipe
  ],
  imports: []
})
export class PipesModule { }
