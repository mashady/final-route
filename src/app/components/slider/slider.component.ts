import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Category } from '../../interfaces/products';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent {
  MianSliderCustomOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: true,
  };
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 7,
      },
    },
    nav: true,
  };
  Category: Category[] = [];
  constructor(private _productService: ProductsService) {}

  ngOnInit(): void {
    this._productService.getAllCategories().subscribe({
      next: (res) => (this.Category = res.data),
      error: (err) => console.log(err),
    });
  }
}
