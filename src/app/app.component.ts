import { Component } from '@angular/core';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ecomm';
  loading: boolean = false;
  constructor(public LoadingService: LoadingService) {}
  ngOnInit() {
    this.LoadingService.loading.subscribe(() => {
      this.loading = this.LoadingService.loading.getValue();
    });
  }
}
