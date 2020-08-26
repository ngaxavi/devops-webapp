import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuildingComponent } from './building.component';
import { BuildingRoutingModule } from './building-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {AddBuildingComponent, AddFlatComponent, DeleteModalComponent} from './modals';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [CommonModule, HttpClientModule, BuildingRoutingModule, MatDialogModule, FormsModule, ReactiveFormsModule],
  declarations: [BuildingComponent, AddBuildingComponent, DeleteModalComponent, AddFlatComponent],
  exports: [BuildingComponent],
  entryComponents: [AddBuildingComponent, DeleteModalComponent, AddFlatComponent]
})
export class BuildingModule {}
