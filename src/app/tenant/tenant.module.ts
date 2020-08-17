import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TenantComponent} from './tenant.component';
import {TenantRoutingModule} from './tenant-routing.module';

@NgModule({
  imports: [CommonModule, TenantRoutingModule],
  declarations: [TenantComponent],
  exports: [TenantComponent]
})
export class TenantModule {

}
