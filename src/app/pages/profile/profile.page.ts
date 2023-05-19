import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../../services/profile.service";
import {UserProfile} from "../../interfaces/UserProfile";
import {UserProfileImpl} from "../../implementations/UserProfileImpl";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userId?: string;
  userProfile?: UserProfile;

  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {

    if (!this.userProfile) this.router.navigate(['profile/login'])

  }

  private loadUser(userId: string) {
    this.profileService.getUser(userId).subscribe(
      data => {
        this.userProfile = new UserProfileImpl(data.id, data.username, data.name, data.surname, data.birth_date, data.scores)
      }
    )
  }
}
