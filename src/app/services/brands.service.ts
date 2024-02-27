import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  constructor(private _HttpClient: HttpClient) {}
  data: any[] = [];
  hasData: boolean = false;
  setData(data: any[]) {
    this.data = data;
  }
  getData() {
    return this.data || [];
  }
  getAllBrands() {
    this.hasData = true;
    return this._HttpClient.get(
      'https://ecommerce.routemisr.com/api/v1/brands'
    );
  }
  getAllCategory() {
    return this._HttpClient.get(
      'https://ecommerce.routemisr.com/api/v1/categories'
    );
  }
}
