import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {UserAuth} from "../../interfaces/UserAuth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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
      ...this.userAuth,
      username: this.authenticationForm.get(['username'])!.value,
      password: this.authenticationForm.get(['password'])!.value
    }
  }

  attemptLogin() {
    const userAuth = this.createFromForm();
    this.authService.postAuth(userAuth).subscribe(
      data => {
        if (data.status == 200){
          this.authService.setLoggedInUser(data.body!)
          this.router.navigate([''])
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
}
