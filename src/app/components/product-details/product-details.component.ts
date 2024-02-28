import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { subscribeOn } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from 'src/app/services/loading.service';
import { WhishlistService } from '../../services/whishlist.service';

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
    private _ToastrService: ToastrService,
    public LoadingService: LoadingService,
    public _WhishlistService: WhishlistService
  ) {}
  ngOnInit() {
    this._ActivatedRoute.params.subscribe((params) => {
      this.productId = params['id'];
    });
    this.LoadingService.loading.next(true);

    this._ProductsService.getProductById(this.productId).subscribe({
      next: (product) => {
        console.log(product.data);

        this.productItem = product.data;
        this.LoadingService.loading.next(false);
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
  addProductToWish(productId: string) {
    // check if the product exist already
    if (this._WhishlistService.wishArray.includes(productId)) {
      console.log('product already exist');

      console.log('now we reomve it');

      // and remove it from the server >> if succces remove from list
      this._WhishlistService.removeProductFromWishList(productId).subscribe({
        next: (res) => {
          console.log(res);
          // okat its exist >> so we willremove it from the list >> after the request send succesfully

          const productIndex =
            this._WhishlistService.wishArray.indexOf(productId);
          if (productIndex > -1) {
            this._WhishlistService.wishArray.splice(productIndex, 1);
          }
          console.log(this._WhishlistService.wishArray);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      console.log('new');
      console.log('then we added to the list');
      console.log(this._WhishlistService.wishArray);

      this._WhishlistService.addProductToWishlist(productId).subscribe({
        next: (res) => {
          console.log(res);
          this._WhishlistService.wishArray.push(productId);
          console.log(this._WhishlistService.wishArray);
        },
        error: (err) => console.log(err),
      });
    }
  }
}
