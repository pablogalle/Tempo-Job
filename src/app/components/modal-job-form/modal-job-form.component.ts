import {Component} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {Job} from "../../interfaces/Job";
import {FormControl, FormGroup} from "@angular/forms";
import {JobService} from "../../services/job.service";

@Component({
  selector: 'app-modal-job-form',
  templateUrl: './modal-job-form.component.html',
  styleUrls: ['./modal-job-form.component.scss'],
})
export class ModalJobFormComponent {


  creatorData?: {
    userId: '',
    username: ''
  }
  job?: Job;
  jobForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl('')
  });

  constructor(
    private modalCtrl: ModalController,
    private jobService: JobService) {
  }

  confirm() {
    const job = this.createFromForm();
    this.jobService.createJob(job).subscribe(
      data => {
        console.log("Job created")
      }
    )
    return this.modalCtrl.dismiss(null, 'confirm');
  }

  createFromForm(): Job {
    return {
      name: this.jobForm.get(['name'])!.value,
      description: this.jobForm.get(['description'])!.value,
      date_of_creation: Date.now(),
      creator: {
        userId: this.creatorData!.userId,
        username: this.creatorData!.username
      }
    }
  }

}
