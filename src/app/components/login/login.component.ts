import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {UserAuth} from "../../interfaces/UserAuth";
import {UserProfile} from "../../interfaces/UserProfile";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userAuth?: UserAuth;

  userId?: string;
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
    if (this.userId){

    }
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
      (data) => {
        this.userId = data._id!
        console.log(data)
        console.log(data._id)
        this.router.navigate([''])
      },
      (error)=>{console.log(error)}

    );
  }
}
