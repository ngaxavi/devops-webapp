import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateAgoPipe } from './date-ago.pipe';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { DeviceComponent } from './device.component';
import { CommonModule } from '@angular/common';
import { DeviceRoutingModule } from './device-routing.module';
import { EditDeviceComponent } from './modals';
import { DeviceValueComponent } from './device-value';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  imports: [CommonModule, HttpClientModule, DeviceRoutingModule, FormsModule, ReactiveFormsModule, ChartModule],
  declarations: [DeviceComponent, DateAgoPipe, EditDeviceComponent, DeviceValueComponent],
  exports: [DeviceComponent],
  entryComponents: [EditDeviceComponent],
})
export class DeviceModule {}
