import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../../services/profile.service";
import {UserProfile} from "../../interfaces/UserProfile";
import {UserProfileImpl} from "../../implementations/UserProfileImpl";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {UserAuth} from "../../interfaces/UserAuth";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userProfile?: UserProfile;
  userAuth?: UserAuth;

  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.checkIfUserLogged()
  }

  private loadUser(userId: string) {
    this.profileService.getUser(userId).subscribe(
      data => {
        this.userProfile = new UserProfileImpl(data.id, data.username, data.name, data.surname, data.birth_date, data.scores)
      }
    )
  }

  async checkIfUserLogged() {
    this.userAuth = await this.authService.getLoggedInUser()
    if (!this.userAuth) {
      this.router.navigate(['/profile', 'login'])
    }
    this.loadUser(this.userAuth!.userDataId!)
  }

  signOutUser() {
    this.authService.clearLoggedInUser()
  }
}
