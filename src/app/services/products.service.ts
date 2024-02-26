import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  baseUrl: string = 'https://ecommerce.routemisr.com';
  hasData: boolean = false;
  public data: any[] = [];
  constructor(private _HttpClient: HttpClient) {}
  setData(data: any) {
    this.data = data;
  }
  getData() {
    return this.data || [];
  }
  getAllProducts(): Observable<any> {
    this.hasData = true;
    return this._HttpClient.get(`${this.baseUrl}/api/v1/products`);
  }

  getProductById(id: string): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/products/${id}`);
  }
  getAllCategories(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/categories`);
  }
}
