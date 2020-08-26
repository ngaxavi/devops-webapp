import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceComponent } from './device.component';
import { DeviceValueComponent } from './device-value';

const routes: Routes = [
  {
    path: '',
    component: DeviceComponent,
  },
  {
    path: ':id',
    component: DeviceValueComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeviceRoutingModule {}
