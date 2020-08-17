import {NgModule} from '@angular/core';
import {DeviceComponent} from './device.component';
import {CommonModule} from '@angular/common';
import {DeviceRoutingModule} from './device-routing.module';

@NgModule({
  imports: [CommonModule, DeviceRoutingModule],
  declarations: [DeviceComponent],
  exports: [DeviceComponent]
})
export class DeviceModule {}
