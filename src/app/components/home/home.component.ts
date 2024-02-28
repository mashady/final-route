import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from 'src/app/interfaces/products';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WhishlistService } from '../../services/whishlist.service';
import { LoadingService } from 'src/app/services/loading.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  isLoading: boolean = true;
  productList: Product[] = [];
  term: string = '';
  constructor(
    public _ProductsService: ProductsService,
    public _CartService: CartService,
    private _ToastrService: ToastrService,
    public _WhishlistService: WhishlistService,
    public LoadingService: LoadingService
  ) {}

  ngOnInit() {
    if (this._ProductsService.hasData === true) {
      this.productList = this._ProductsService.getData();
    } else {
      this.LoadingService.loading.next(true);
      this._CartService.cartInit();
      this._ProductsService.getAllProducts().subscribe({
        next: (res) => {
          console.log(res.data);
          this.productList = res.data;
          this._ProductsService.setData(res.data);
          this.LoadingService.loading.next(false);
        },
        error: (err) => {
          console.log(err);
          //this.isLoading = false;
        },
      });
    }
  }

  addProductToCart(productId: string) {
    this._CartService.addProductToCart(productId).subscribe({
      next: (res: any) => {
        console.log(res);
        this._ToastrService.success('', 'it has been added successfully🎉');
        this._CartService.numberOfCartItems.next(res.numOfCartItems);
        //this._CartService.userCartData.next(res.data);
        this._CartService.cartInit();
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
          this._ToastrService.success('', 'it has been added successfully🎉');
        },
        error: (err) => console.log(err),
      });
    }
  }
}
