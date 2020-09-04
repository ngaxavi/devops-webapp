import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TenantComponent } from './tenant.component';
import { TenantRoutingModule } from './tenant-routing.module';
import { AddEditOccupantComponent, DeleteModalComponent } from './modals';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BillingComponent } from './billing';

@NgModule({
  imports: [CommonModule, TenantRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule, MatDatepickerModule],
  declarations: [TenantComponent, AddEditOccupantComponent, DeleteModalComponent, BillingComponent],
  exports: [TenantComponent],
  entryComponents: [AddEditOccupantComponent, DeleteModalComponent],
})
export class TenantModule {}
