import { Component } from '@angular/core';
import { WhishlistService } from '../../services/whishlist.service';
import { CartService } from '../../services/cart.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent {
  wishes: any = [];
  constructor(
    public _WhishlistService: WhishlistService,
    public _CartService: CartService,
    public LoadingService: LoadingService,
    private _ToastrService: ToastrService
  ) {}
  ngOnInit() {
    this.getWishes();
  }

  // get all user wishlist
  getWishes() {
    this.LoadingService.loading.next(true);

    this._WhishlistService.getUserWishlist().subscribe({
      next: (res) => {
        console.log(res);
        this.wishes = res.data;
        this.LoadingService.loading.next(false);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // remove item from user wishlist
  removeOneFromWish(productId: any) {
    this._WhishlistService.removeProductFromWishList(productId).subscribe({
      next: (res) => {
        console.log(res);
        this._WhishlistService.getUserWishlist().subscribe({
          next: (res) => {
            this.wishes = res.data;
          },
        });
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
        this._ToastrService.success('', 'it has been added successfully🎉');
        this._CartService.numberOfCartItems.next(res.numOfCartItems);
        this._CartService.cartInit();
      },
      error: (err) => console.log(err),
      complete: () => {
        this.removeOneFromWish(productId);
      },
    });
  }
}
