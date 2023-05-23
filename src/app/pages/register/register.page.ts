import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {UserProfile} from "../../interfaces/UserProfile";
import {ProfileService} from "../../services/profile.service";
import {UserRegister} from "../../interfaces/UserRegister";
import {AuthenticationService} from "../../services/authentication.service";
import {UserAuth} from "../../interfaces/UserAuth";

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
    email: new FormControl(''),
    birthDate: new FormControl('')
  });

  userRegister?: UserRegister;

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  createFromForm(){
    return {
      ...this.userRegister,
      username: this.registrationForm.get(['username'])!.value,
      email: this.registrationForm.get(['email'])!.value,
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
      data => {
        console.log(data.status);
        if (data.status == 200){
          console.log(data.body)
          this.authService.setLoggedInUser(data.body!)
          this.router.navigate(['tabs'])
        }
      }
    )
  }

  cancelRegister() {
    this.router.navigate(['login'])

  }
}
