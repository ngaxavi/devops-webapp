import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TenantComponent } from './tenant.component';
import { BillingComponent } from './billing';

const routes: Routes = [
  {
    path: '',
    component: TenantComponent,
  },
  {
    path: ':id/billing',
    component: BillingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TenantRoutingModule {}
