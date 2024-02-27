import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cartItems: any = [];
  emptyCart: boolean = true;
  cartId: string = '';
  constructor(
    private _CartService: CartService,
    public LoadingService: LoadingService
  ) {}
  ngOnInit(): void {
    this.getUserData();
  }
  getUserData() {
    this.LoadingService.loading.next(true);
    this._CartService.getUserCart().subscribe({
      next: (res) => {
        this.cartItems = res;
        this.cartId = res.data._id;
        console.log(res);
        console.log('this res from cart comp ts');
        this.emptyCart = false;
        this.LoadingService.loading.next(false);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  removeProductFromCart(productId: string) {
    this._CartService.removeProductById(productId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.cartItems = res;
        this._CartService.numberOfCartItems.next(res.numOfCartItems);
        this.cartItems.data.totalCartPrice = res.data.totalCartPrice;
        this.cartItems.numOfCartItems = res.numOfCartItems;
      },
      error: (err) => console.log(err),
    });
  }
  updateCart(productId: string, count: number) {
    this._CartService.updateCartCount(productId, count).subscribe({
      next: (res: any) => {
        console.log(res);
        this.cartItems = res;

        this.cartItems.data.totalCartPrice = res.data.totalCartPrice;
        this.cartItems.numOfCartItems = res.numOfCartItems;
      },
      error: (err) => console.log(err),
    });
  }
  clearCart() {
    this._CartService.clearCart().subscribe({
      next: (res: any) => {
        console.log(res);
        this.cartItems = res;
        this.emptyCart = true;
        this.cartItems.data.totalCartPrice = res.data.totalCartPrice;
        this.cartItems.numOfCartItems = res.numOfCartItems;
      },
      error: (err) => console.log(err),
    });
  }
}
