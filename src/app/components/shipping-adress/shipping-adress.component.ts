import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-shipping-adress',
  templateUrl: './shipping-adress.component.html',
  styleUrls: ['./shipping-adress.component.css'],
})
export class ShippingAdressComponent {
  cartId: string = '';
  constructor(
    private _PaymentService: PaymentService,
    private _ActivatedRoute: ActivatedRoute
  ) {}
  shippingAddress: FormGroup = new FormGroup({
    details: new FormControl(),
    phone: new FormControl(),
    city: new FormControl(),
  });
  submitShippingAdress(dataForm: FormGroup) {
    this._ActivatedRoute.params.subscribe((params) => {
      console.log(params);
      this.cartId = params['id'];
    });
    console.log(dataForm.value);
    this._PaymentService.checkOut(this.cartId, dataForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
        window.location.href = res.session.url;
      },
      error: (err) => console.error(err),
    });
  }
}
