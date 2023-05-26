import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {Job} from "../../interfaces/Job";
import {JobService} from "../../services/job.service";
import {JobImpl} from "../../implementations/JobImpl";

@Component({
  selector: 'app-modal-job-info',
  templateUrl: './modal-job-info.component.html',
  styleUrls: ['./modal-job-info.component.scss'],
})
export class ModalJobInfoComponent implements OnInit{

  jobId: string = "";
  job: Job = new JobImpl({username:"",userId:""}, Date.now(),"","");

  constructor(private modalCtrl: ModalController,
              private jobService: JobService) {}

  ngOnInit(): void {
    this.loadJobInfo();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss({id: this.job.creator.userId, username: this.job.creator.username} , 'confirm');
  }


  private async loadJobInfo() {
    this.jobService.getJobById(this.jobId).subscribe(
      data => {
        console.log(data)
        this.job = data;
      },
      error => {console.log(error)},
      () => {}
    )
  }
}
