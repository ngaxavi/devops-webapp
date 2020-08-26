import { Occupant, Flat, AddEditOccupantData, DeleteData } from './../app.interface';
import { BuildingService } from './../building/building.service';
import { TenantService } from './tenant.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AddEditOccupantComponent, DeleteModalComponent } from './modals';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
})
export class TenantComponent implements OnInit {
  public occupants: Occupant[];
  public occupantCell: number;

  public flats: Flat[];

  constructor(
    private readonly tenantService: TenantService,
    private readonly dialog: MatDialog,
    private readonly buildingService: BuildingService,
  ) {}

  ngOnInit(): void {
    this.loadOccupants();
  }

  async createOccupant(): Promise<void> {
    await this.getUnoccupiedFlats();

    const dialogConfig = new MatDialogConfig<AddEditOccupantData>();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      title: 'Create',
      name: '',
      flat: '',
      moveInDate: new Date(),
      moveOutDate: null,
      flats: this.flats,
    };

    const dialogRef = this.dialog.open(AddEditOccupantComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.tenantService
          .createOccupant(data)
          .pipe(take(1))
          .subscribe((d) => {
            this.loadOccupants();
          });
      }
    });
  }

  async updateOccupant(occupant: Occupant): Promise<void> {
    await this.getUnoccupiedFlats(occupant.flat);

    const dialogConfig = new MatDialogConfig<AddEditOccupantData>();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      title: 'Update',
      name: occupant.name,
      flat: occupant.flat,
      moveInDate: occupant.moveInDate,
      moveOutDate: occupant.moveOutDate,
      flats: this.flats,
    };

    const dialogRef = this.dialog.open(AddEditOccupantComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.tenantService
          .updateOccupant(occupant._id, data)
          .pipe(take(1))
          .subscribe((d) => {
            this.loadOccupants();
          });
      }
    });
  }

  deleteOccupant(occupant: Occupant): void {
    const dialogConfig = new MatDialogConfig<DeleteData>();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      title: 'Occupant',
      name: occupant.name,
    };

    const dialogRef = this.dialog.open(DeleteModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        console.log(occupant._id);
        this.tenantService
          .deleteOccupant(occupant._id)
          .pipe(take(1))
          .subscribe((d) => {
            this.loadOccupants();
          });
      }
    });
  }

  private loadOccupants(): void {
    this.tenantService
      .getAll()
      .pipe(take(1))
      .subscribe((data: Occupant[]) => {
        this.occupants = data;
      });
  }

  private async getUnoccupiedFlats(omitFlat: string = null): Promise<void> {
    const flats = await this.buildingService.getAllFlats().pipe(take(1)).toPromise();
    this.flats = flats.filter((f: Flat) => !f.occupied || f.flatId === omitFlat);
  }
}
