import { Component } from '@angular/core';
import { WhishlistService } from '../../services/whishlist.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent {
  wishes: any = [];
  constructor(
    public _WhishlistService: WhishlistService,
    public _CartService: CartService
  ) {}
  ngOnInit() {
    this.getWishes();
  }

  // get all user wishlist
  getWishes() {
    /**
    if (this._WhishlistService.hasData === true) {
      console.log('u already have the data');

      console.log(this._WhishlistService.getData());
    } else {
      console.log('udidnot have hte data ');
      this._WhishlistService.getUserWishlist().subscribe({
        next: (res) => {
          console.log(res);
          this.wishes = res.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
    */
    this._WhishlistService.getUserWishlist().subscribe({
      next: (res) => {
        console.log(res);
        this.wishes = res.data;
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
        //this.wishes = this._WhishlistService.data;
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
}
