import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {UserProfile} from "../../interfaces/UserProfile";
import {ProfileService} from "../../services/profile.service";
import {UserRegister} from "../../interfaces/UserRegister";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registrationForm = new FormGroup({
    name: new FormControl(''),
    password: new FormControl(''),
    surname: new FormControl(''),
    username: new FormControl(''),
    birthDate: new FormControl('')
  });

  userRegister?: UserRegister;

  constructor(
    private router: Router,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
  }

  createFromForm(){
    return {
      ...this.userRegister,
      username: this.registrationForm.get(['username'])!.value,
      name: this.registrationForm.get(['name'])!.value,
      surname: this.registrationForm.get(['surname'])!.value,
      password: this.registrationForm.get(['password'])!.value,
      birth_date: this.registrationForm.get(['birthDate'])!.value
    }
  }

  attemptRegister() {
    const userProfile = this.createFromForm()
    console.log(userProfile)

    this.profileService.createUser(userProfile).subscribe(
      next => {
        if (next.status == 200){

        }
      }
    )


  }
}
