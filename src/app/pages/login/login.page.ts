import { Component, OnInit } from '@angular/core';
import {UserAuth} from "../../interfaces/UserAuth";
import {FormControl, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userAuth?: UserAuth;
  loginAttFailed = false;
  authenticationForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  createFromForm(): UserAuth {
    return {
      username: this.authenticationForm.get(['username'])!.value,
      password: this.authenticationForm.get(['password'])!.value
    }
  }

  attemptLogin() {
    const userAuth = this.createFromForm();
    this.authService.postAuth(userAuth).subscribe(
      data => {
        if (data.status === 200){
          this.authService.setLoggedInUser(data.body!).then(
            () => this.router.navigate(['tabs'])
          )
        }else {
          this.loginAttFailed = true
          console.log(data.status, data.statusText)
        }
      },
      (error) => {
        console.log("Error: ",error)
      }
    );
  }

  navigateToRegister() {
    this.router.navigate(['register'])
  }
}
