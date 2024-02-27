import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  isLoading: boolean = false;
  apiError: string = '';
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/),
      ]),
      rePassword: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    { validators: this.checkRePasswordMatch }
  );

  constructor(
    private _AuthService: AuthService,
    public _Router: Router,
    public CartService: CartService
  ) {}

  submitRegister(dataForm: FormGroup) {
    this.isLoading = true;
    if (dataForm.valid) {
      this._AuthService.signUp(dataForm.value).subscribe({
        next: (res) => {
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
        complete: () => {
          this.CartService.cartInit();
        },
      });
    }
  }

  checkRePasswordMatch(dataForm: any) {
    if (dataForm.get('password')?.value === dataForm.get('rePassword')?.value) {
      return null;
    } else {
      dataForm.get('rePassword')?.setErrors({
        rePasswordMatch: 're passowrd not match password',
      });
      return {
        rePasswordMatch: 're passowrd not match password',
      };
    }
  }
}
