import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CartComponent } from './components/cart/cart.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuard } from './guard/auth.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ShippingAdressComponent } from './components/shipping-adress/shipping-adress.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    canActivate: [authGuard],
    component: HomeComponent,
    title: 'home',
  },
  { path: 'products', component: ProductsComponent, title: 'products' },
  {
    path: 'product-details/:id',
    component: ProductDetailsComponent,
    title: 'products',
  },
  { path: 'categories', component: CategoriesComponent, title: 'categories' },
  {
    path: 'shippingAddress/:id',
    component: ShippingAdressComponent,
    title: 'shippingAddress',
  },
  { path: 'allorders', component: AllOrdersComponent, title: 'allOrders' },
  { path: 'wishlist', component: WishlistComponent, title: 'wishes' },
  { path: 'brands', component: BrandsComponent, title: 'brands' },
  { path: 'cart', component: CartComponent, title: 'cart' },
  { path: 'register', component: RegisterComponent, title: 'register' },
  { path: 'login', component: LoginComponent, title: 'login' },
  { path: '**', component: NotfoundComponent, title: 'pagenotfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
