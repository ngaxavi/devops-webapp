import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BuildingComponent} from './building.component';
import {BuildingRoutingModule} from './building-routing.module';

@NgModule({
  imports: [CommonModule, BuildingRoutingModule],
  declarations: [BuildingComponent],
  exports: [BuildingComponent]
})
export class BuildingModule {
}
