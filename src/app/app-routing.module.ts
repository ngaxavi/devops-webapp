import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  {
    path: 'tenants',
    loadChildren: () => import('./tenant/tenant.module').then((m) => m.TenantModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'devices',
    loadChildren: () => import('./device/device.module').then((m) => m.DeviceModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'buildings',
    loadChildren: () => import('./building/building.module').then((m) => m.BuildingModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '/buildings',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
