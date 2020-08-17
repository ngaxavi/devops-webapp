import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BuildingComponent} from './building.component';

const routes: Routes = [
  {
    path: '',
    component: BuildingComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuildingRoutingModule { }
