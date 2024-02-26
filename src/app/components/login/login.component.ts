import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isLoading: boolean = false;
  apiError: string = '';
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/),
    ]),
  });

  constructor(private _AuthService: AuthService, public _Router: Router) {}

  submitLogin(dataForm: FormGroup) {
    this.isLoading = true;

    if (dataForm.valid) {
      this._AuthService.signIn(dataForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'success') {
            localStorage.setItem('userToken', res.token);
            this._AuthService.decodeUserToken();
            this.isLoading = false;
            this._Router.navigate(['/home']);
          }
        },
        error: (err) => {
          console.log(err);
          this.apiError = err.error.message;
        },
      });
    }
  }
}
