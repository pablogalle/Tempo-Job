import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {Router} from "@angular/router";
import {ProfileService} from "../../services/profile.service";
import {UserRegister} from "../../interfaces/UserRegister";
import {AuthenticationService} from "../../services/authentication.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registrationForm?: FormGroup;

  userRegister?: UserRegister;
  registerFail: boolean = false;

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm()
  }

  /** Intento de validar fecha de nacimiento **/
  validateDateOfBirth (control: FormControl){
    const dateOfBirth = control.value!;
    const age = this.calculateAge(dateOfBirth);
    if (isNaN(dateOfBirth.getTime()) || age < 18) {
      return { 'invalidDateOfBirth': true };
    }
    return null;
  }

  calculateAge(birthday: Date) : number {
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  youngerThanValidator = (maxAge: number): ValidatorFn => control =>
    (new Date()).getFullYear() - (new Date(control.value)).getFullYear() > maxAge
      ? { younger: { maxAge } }
      : null;

  /** -------------------------------------- **/

  private buildForm() {
    this.registrationForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      surname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required, Validators.minLength(8), Validators.maxLength(100)],
      birthDate: ['', Validators.required/*this.validateDateOfBirth*/]
    })
  }
  createFromForm(){
    return {
      ...this.userRegister,
      username: this.registrationForm!.get(['username'])!.value,
      email: this.registrationForm!.get(['email'])!.value,
      name: this.registrationForm!.get(['name'])!.value,
      surname: this.registrationForm!.get(['surname'])!.value,
      password: this.registrationForm!.get(['password'])!.value,
      birth_date: this.registrationForm!.get(['birthDate'])!.value
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
      },
      error => {this.registerFail = true}
    )
  }

  cancelRegister() {
    this.registrationForm?.reset()
    this.router.navigate(['login'])

  }
}
