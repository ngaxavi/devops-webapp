import { Device, EditDeviceData } from './../app.interface';
import { DeviceService } from './device.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { EditDeviceComponent } from './modals';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
})
export class DeviceComponent implements OnInit {
  public devices: Device[];
  public deviceCell: number;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly deviceService: DeviceService,
    private readonly dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadDevices();
  }

  updateDevice(device: Device): void {
    const dialogConfig = new MatDialogConfig<EditDeviceData>();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      name: device.name,
      deviceId: device.deviceId,
    };

    const dialogRef = this.dialog.open(EditDeviceComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.deviceService
          .updateOne(device._id, data)
          .pipe(take(1))
          .subscribe((d) => {
            this.loadDevices();
          });
      }
    });
  }

  viewDeviceValues(device: any): void {
    this.router.navigate([device._id], { relativeTo: this.route });
  }

  private loadDevices(): void {
    this.deviceService
      .getAll()
      .pipe(take(1))
      .subscribe((data: Device[]) => {
        this.devices = data;
      });
  }
}
