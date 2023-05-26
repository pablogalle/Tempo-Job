import {Component, OnInit, ViewChild} from '@angular/core';
import {JobService} from "../../services/job.service";
import {Job} from "../../interfaces/Job";
import {IonInfiniteScroll, ModalController} from "@ionic/angular";
import {ModalJobInfoComponent} from "../../components/modal-job-info/modal-job-info.component";
import {Chat} from "../../interfaces/Chat";
import {AuthenticationService} from "../../services/authentication.service";
import {ChatImpl} from "../../implementations/ChatImpl";
import {ChatService} from "../../services/chat.service";

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.page.html',
  styleUrls: ['./jobs.page.scss'],
})
export class JobsPage implements OnInit {

  /** Cargar trabajos nuevos cuando se crean nuevos/eliminan **/
  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll!: IonInfiniteScroll;
  data: Job[] = [];
  jobList: Job[] = []

  constructor(
    private jobService: JobService,
    private modalCtrl: ModalController,
    private authService: AuthenticationService,
    private chatService: ChatService
  ) {
  }

  ngOnInit() {
    this.loadJobs()
  }

  private loadJobs() {
    this.jobService.getJobs().subscribe(
      data => {
        this.data = data
        this.jobList.push(...this.data.splice(0, 5));
      }
    )
  }

  loadData(event: any) {
    setTimeout(() => {
      console.log("LoadData")
      if (this.jobList.length < 5) {
        event.target.complete();
        this.jobList.push(...this.data);
        this.infiniteScroll.disabled = true;
        return;
      }
      this.jobList.push(...this.data.splice(0, 3));

      event.target.complete();
    }, 1000);
  }

  async openJobInfo(jobId: string) {
    const modal = await this.modalCtrl.create({
      component: ModalJobInfoComponent,
      componentProps: {
        jobId: jobId
      }
    });
    modal.present();

    const {data, role} = await modal.onWillDismiss()
    if (role === 'confirm') {

      const userAuth  = await this.authService.getLoggedInUser()
      const {userId, username} ={userId:userAuth.userDataId!, username:userAuth.username!};

      const newChat: Chat = new ChatImpl({appliant: {userId: userId, username: username}, contractor: {userId: data.id, username: data.username}})

      this.chatService.createNewChat(newChat).subscribe(
        next => console.log(next),
        err => console.log(err)
      )
    }
  }
}
