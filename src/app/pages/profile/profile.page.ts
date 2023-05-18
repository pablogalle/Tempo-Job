import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../../services/profile.service";
import {UserProfile} from "../../interfaces/UserProfile";
import {UserProfileImpl} from "../../implementations/UserProfileImpl";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userProfile?: UserProfile;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
  }

  private loadUser(id : string) {
    this.profileService.getUser(id).subscribe(
      data => {
        this.userProfile = new UserProfileImpl(data.id, data.username,data.name, data.surname, data.birth_date, data.scores)
      }
    )
  }
}
