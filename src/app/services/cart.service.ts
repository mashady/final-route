import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  baseUrl: string = 'https://route-ecommerce.onrender.com';
  headers: any = {
    token: localStorage.getItem('userToken') || '',
  };
  numberOfCartItems = new BehaviorSubject(0);
  userCartData = new BehaviorSubject(null);

  constructor(private _HttpClient: HttpClient) {
    this.cartInit();
  }

  addProductToCart(productId: string) {
    return this._HttpClient.post(
      `${this.baseUrl}/api/v1/cart`,
      { productId: productId },
      { headers: this.headers }
    );
  }
  cartInit() {
    this.getUserCart().subscribe({
      next: (res: any) => {
        console.log(res);
        console.log('cart serv init');
        this.numberOfCartItems.next(res.numOfCartItems);
        this.userCartData.next(res.data); // deal with it as a behavior when add new items update it
      },
      error: (err) => console.error(err),
    });
  }
  getUserCart(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/cart`, {
      //headers: this.headers,
    });
  }
  removeProductById(productId: string) {
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart/${productId}`, {
      // headers: this.headers,
    });
  }
  updateCartCount(productId: string, count: number) {
    return this._HttpClient.put(
      `${this.baseUrl}/api/v1/cart/${productId}`,
      { count: count }
      // { headers: this.headers }
    );
  }

  clearCart() {
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart/`, {
      // headers: this.headers,
    });
  }
}
