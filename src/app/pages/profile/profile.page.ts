import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../../services/profile.service";
import {UserProfile} from "../../interfaces/UserProfile";
import {UserProfileImpl} from "../../implementations/UserProfileImpl";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {UserAuth} from "../../interfaces/UserAuth";
import {Job} from "../../interfaces/Job";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit  {
  userProfile?: UserProfile;
  userAuth?: UserAuth;
  userJobList: Job[]  = [];

  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) {
  }

  ngOnInit() {
    console.log('oninit')
    this.checkIfUserLogged()
  }

  private loadUser(userId: string) {
    this.profileService.getUser(userId).subscribe(
      data => {
        this.userProfile = new UserProfileImpl(data.id!, data.username, data.name, data.surname, data.birth_date, data.scores!)
      }
    )
    this.profileService.getJobsOfUser(userId).subscribe(
      next => {
        this.userJobList = next
        console.log(this.userJobList)
      }
    )
    console.log(this.userJobList)
  }

  async checkIfUserLogged() {
    this.userAuth = await this.authService.getLoggedInUser()
    if (!this.userAuth) {
      this.router.navigate(['login'])
    }
    this.loadUser(this.userAuth!.userDataId!)
  }

  signOutUser() {
    this.authService.clearLoggedInUser()
    this.router.navigate(['login'], { replaceUrl: true });
  }
}
