import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch:'full'
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(

          m => m.ProfilePageModule)
      },
      {
        path: 'chats',
        loadChildren: () => import('../chats/chats.module').then(

          m => m.ChatsPageModule)
      },
      {
        path: 'jobs',
        loadChildren: () => import('../jobs/jobs.module').then(

          m => m.JobsPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
