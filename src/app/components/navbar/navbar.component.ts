import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isLogin: boolean = false;
  numberOfCart: number = 0;
  constructor(
    public _AuthService: AuthService,
    public _CartService: CartService
  ) {}

  ngOnInit(): void {
    this._CartService.numberOfCartItems.subscribe(() => {
      this.numberOfCart = this._CartService.numberOfCartItems.getValue();
    });
    this._AuthService.userData.subscribe({
      next: () => {
        if (this._AuthService.userData.getValue() != null) {
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
      },
      error: (err) => console.log(err),
    });
  }
  handleLogout() {
    this._AuthService.logOut();
  }
}
