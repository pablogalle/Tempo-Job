import {Component, OnInit, ViewChild} from '@angular/core';
import {JobService} from "../../services/job.service";
import {Job} from "../../interfaces/Job";
import {IonInfiniteScroll} from "@ionic/angular";

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.page.html',
  styleUrls: ['./jobs.page.scss'],
})
export class JobsPage implements OnInit {

  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll!: IonInfiniteScroll;
  data: Job[] = [];
  jobList : Job[] = []

  constructor(
    private jobService: JobService
  ) { }

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
}
