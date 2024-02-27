import { Component } from '@angular/core';
import { BrandsService } from '../../services/brands.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  cats: any[] = [];
  constructor(
    private BrandsService: BrandsService,
    public LoadingService: LoadingService
  ) {}
  ngOnInit() {
    this.LoadingService.loading.next(true);

    this.BrandsService.getAllCategory().subscribe({
      next: (res: any) => {
        this.cats = res.data;
        this.LoadingService.loading.next(false);
      },
    });
  }
}
