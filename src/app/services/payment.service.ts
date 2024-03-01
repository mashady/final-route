import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  baseUrl: string = 'https://route-ecommerce.onrender.com';
  headers: any = {
    token: localStorage.getItem('userToken') || '',
  };
  constructor(private _HttpClient: HttpClient) {}

  checkOut(cartId: string, shippingAdress: any) {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      { shippingAdress: shippingAdress }
      //{ headers: this.headers }
    );
  }
}
