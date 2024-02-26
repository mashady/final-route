import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { subscribeOn } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  productItem: any;
  productId: string = '';
  constructor(
    private _ProductsService: ProductsService,
    private _ActivatedRoute: ActivatedRoute,
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}
  ngOnInit() {
    this._ActivatedRoute.params.subscribe((params) => {
      this.productId = params['id'];
    });
    this._ProductsService.getProductById(this.productId).subscribe({
      next: (product) => {
        console.log(product.data);

        this.productItem = product.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addProductToCart(productId: string) {
    this._CartService.addProductToCart(productId).subscribe({
      next: (res: any) => {
        console.log(res);
        this._ToastrService.success('Hello world!', 'Toastr fun!');
        this._CartService.numberOfCartItems.next(res.numOfCartItems);
      },
      error: (err) => console.log(err),
    });
  }
}
