import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { TenantService } from '../tenant.service';
import { Billing, Occupant, OccupantBilling } from './../../app.interface';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
})
export class BillingComponent implements OnInit {
  public today = new Date();
  public occupant: Occupant;
  public address: string[];
  public billings: Billing[];
  public subTotal: number;
  public taxes: number;
  public total: number;
  public uid: number;
  public isLoading: boolean;

  constructor(private readonly route: ActivatedRoute, private tenantService: TenantService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.isLoading = true;

    this.tenantService
      .getMeterValueForFlatBilling(id)
      .pipe(take(1))
      .subscribe(
        (data: OccupantBilling) => {
          this.uid = this.getRndInteger(100, 1000);
          this.occupant = data.occupant;
          this.address = data.address.indexOf(',') !== -1 ? data.address.split(',') : [data.address, ''];
          this.billings = data.billings;

          this.subTotal = this.billings.map((b: any) => b.billingValue).reduce((a: number, b: number) => a + b, 0);
          this.taxes = Math.floor((19 * this.subTotal) / 100);
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          console.error(error);
        },
      );
  }

  getRndInteger(minimum: number, maximum: number): number {
    return Math.floor(Math.random() * (maximum - minimum)) + minimum;
  }
}
