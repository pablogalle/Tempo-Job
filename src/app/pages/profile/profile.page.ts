import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../../services/profile.service";
import {UserProfile} from "../../interfaces/UserProfile";
import {UserProfileImpl} from "../../implementations/UserProfileImpl";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {UserAuth} from "../../interfaces/UserAuth";
import {Job} from "../../interfaces/Job";
import {ModalController} from "@ionic/angular";
import {ModalJobFormComponent} from "../../components/modal-job-form/modal-job-form.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit  {
  userProfile?: UserProfile;
  userAuth?: UserAuth;
  userJobList: Job[]  = [];
  jobToDelete?: Job;

  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private modalCtrl: ModalController
  ) {
  }

  ngOnInit() {
    this.checkIfUserLogged()
  }

  private loadUser(userId: string) {
    this.profileService.getUser(userId).subscribe(
      data => {
        this.userProfile = new UserProfileImpl(data.id!, data.username, data.email, data.name, data.surname, data.birth_date, data.scores!)
      }
    )
    this.loadUserJobs()
  }

  private loadUserJobs() {
    this.profileService.getJobsOfUser(this.userAuth!.userDataId!).subscribe(
      next => {
        this.userJobList = next
      }
    )
  }

  async checkIfUserLogged() {
    this.userAuth = await this.authService.getLoggedInUser()
    if (!this.userAuth) {
      this.router.navigate(['login'], { replaceUrl: true })
    }
    this.loadUser(this.userAuth!.userDataId!)
  }

  signOutUser() {
    this.authService.clearLoggedInUser().then(
      () => this.router.navigate(['login'], { replaceUrl: true })
    )
  }

  async openJobModal() {
    const modal = await this.modalCtrl.create({
      component: ModalJobFormComponent,
      componentProps: {
        creatorData : {
          userId : this.userAuth!.userDataId,
          username : this.userAuth!.username
        }
      }
    });
    modal.present();

    await modal.onWillDismiss().then(
      () => {
        console.log('loading jobs')
        this.loadUserJobs()
      }
    );
  }

  deleteJob() {
    this.profileService.deleteJob(this.jobToDelete!._id!).subscribe(
      response =>{
        this.loadUserJobs()
      }
    )
  }

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel'
    },
    {
      text: 'Delete',
      role: 'confirm'
    }
  ];

  setResult(event: any) {
    if (event.detail.role == 'confirm'){
      this.deleteJob()
    }
  }
}
