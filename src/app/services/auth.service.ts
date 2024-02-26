import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = 'https://ecommerce.routemisr.com';
  userData = new BehaviorSubject(null);

  constructor(public _HttpClient: HttpClient, private _router: Router) {
    if (localStorage.getItem('userToken')) {
      this.decodeUserToken();
    }
  }

  decodeUserToken() {
    let userToken = JSON.stringify(localStorage.getItem('userToken'));
    let decodeToken: any = jwtDecode(userToken);
    this.userData.next(decodeToken);
    console.log(this.userData.getValue());
  }

  signUp(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signup`, data);
  }

  signIn(data: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signin`, data);
  }

  logOut() {
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._router.navigate(['/login']);
  }
}
