import { BuildingService } from './building.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddBuildingComponent, DeleteModalComponent } from './modals';
import { AddFlatComponent } from './modals/add-flat.component';
import { Building, Flat, AddEditBuildingData, AddEditFlatData, DeleteData } from '../app.interface';
@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.scss'],
})
export class BuildingComponent implements OnInit {
  public buildings: Building[] = [];
  public flats: Flat[] = [];
  public hoverCell: number;
  public flatCell: number;

  constructor(private readonly buildingService: BuildingService, private readonly dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadBuildings(true);
  }

  createNewBuilding(): void {
    const dialogConfig = new MatDialogConfig<AddEditBuildingData>();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      title: 'Create',
      name: '',
      address: '',
      nbOfFloor: 0,
    };

    const dialogRef = this.dialog.open(AddBuildingComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.buildingService
          .createBuilding(data)
          .pipe(take(1))
          .subscribe((d) => {
            this.loadBuildings();
          });
      }
    });
  }

  createNewFlat(): void {
    const dialogConfig = new MatDialogConfig<AddEditFlatData>();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      title: 'Create',
      flatId: '',
      building: '',
      buildings: this.buildings,
    };

    const dialogRef = this.dialog.open(AddFlatComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.buildingService
          .createFlat(data)
          .pipe(take(1))
          .subscribe((d) => {
            this.loadFlats();
          });
      }
    });
  }

  updateBuilding(building: Building): void {
    const dialogConfig = new MatDialogConfig<AddEditBuildingData>();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      title: 'Edit',
      name: building.name,
      address: building.address,
      nbOfFloor: building.nbOfFloor,
    };

    const dialogRef = this.dialog.open(AddBuildingComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.buildingService
          .updateBuilding(building._id, data)
          .pipe(take(1))
          .subscribe((d) => {
            this.loadBuildings(true);
          });
      }
    });
  }

  updateFlat(flat: Flat): void {
    const dialogConfig = new MatDialogConfig<AddEditFlatData>();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      title: 'Edit',
      flatId: flat.flatId,
      building: flat.building,
      buildings: this.buildings,
    };

    const dialogRef = this.dialog.open(AddBuildingComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.buildingService
          .updateBuilding(flat._id, data)
          .pipe(take(1))
          .subscribe((d) => {
            this.loadFlats();
          });
      }
    });
  }

  deleteBuilding(building: Building): void {
    const dialogConfig = new MatDialogConfig<DeleteData>();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      title: 'Building',
      name: building.name,
    };

    const dialogRef = this.dialog.open(DeleteModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.buildingService
          .deleteBuilding(building._id)
          .pipe(take(1))
          .subscribe((d) => {
            this.loadBuildings();
          });
      }
    });
  }

  deleteFlat(flat: Flat): void {
    const dialogConfig = new MatDialogConfig<DeleteData>();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      title: 'Flat',
      name: flat.flatId,
    };

    const dialogRef = this.dialog.open(DeleteModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.buildingService
          .deleteFlat(flat._id)
          .pipe(take(1))
          .subscribe((d) => {
            this.loadFlats();
          });
      }
    });
  }

  private loadBuildings(reloadFlats = false): void {
    this.buildingService
      .getAll()
      .pipe(take(1))
      .subscribe((data: Building[]) => {
        this.buildings = data;
        if (reloadFlats) {
          this.loadFlats();
        }
      });
  }

  private loadFlats(): void {
    this.buildingService
      .getAllFlats()
      .pipe(take(1))
      .subscribe((data: Flat[]) => {
        this.flats = data.map((f: Flat) => ({
          ...f,
          buildingName: this.buildings.find((b) => b._id === f.building).name,
        }));
      });
  }
}
