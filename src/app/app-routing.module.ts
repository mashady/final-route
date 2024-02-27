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
import { ForgetComponent } from './components/forget/forget.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    canActivate: [authGuard],
    component: HomeComponent,
    title: 'home',
  },
  {
    path: 'products',
    component: ProductsComponent,
    title: 'products',
    canActivate: [authGuard],
  },
  {
    path: 'product-details/:id',
    component: ProductDetailsComponent,
    title: 'products',
    canActivate: [authGuard],
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    title: 'categories',
    canActivate: [authGuard],
  },
  {
    path: 'shippingAddress/:id',
    component: ShippingAdressComponent,
    title: 'shippingAddress',
    canActivate: [authGuard],
  },
  {
    path: 'allorders',
    component: AllOrdersComponent,
    title: 'allOrders',
    canActivate: [authGuard],
  },
  {
    path: 'forget-pass',
    component: ForgetComponent,
    title: 'forget pass',
    canActivate: [authGuard],
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
    title: 'wishes',
    canActivate: [authGuard],
  },
  {
    path: 'brands',
    component: BrandsComponent,
    title: 'brands',
    canActivate: [authGuard],
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'cart',
    canActivate: [authGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'register',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'login',
  },
  {
    path: '**',
    component: NotfoundComponent,
    title: 'pagenotfound',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
