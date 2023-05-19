import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import {HttpClientModule} from "@angular/common/http";
import {LoginComponent} from "../../components/login/login.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
    declarations: [ProfilePage, LoginComponent]
})
export class ProfilePageModule {}
