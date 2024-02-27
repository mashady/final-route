import { Component } from '@angular/core';
import { BrandsService } from '../../services/brands.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
})
export class BrandsComponent {
  constructor(
    public _BrandsService: BrandsService,
    public LoadingService: LoadingService
  ) {}
  brands: any[] = [];
  ngOnInit() {
    if (this._BrandsService.hasData === true) {
      console.log('data already fetched');
      console.log(this._BrandsService.data);
      this.brands = this._BrandsService.data;
    } else {
      this.LoadingService.loading.next(true);

      console.log('data not fetched');
      this._BrandsService.getAllBrands().subscribe({
        next: (res: any) => {
          console.log(res);
          this._BrandsService.setData(res.data);
          this.brands = res.data;
          this.LoadingService.loading.next(false);
        },
        error: () => {},
      });
    }
  }
}
