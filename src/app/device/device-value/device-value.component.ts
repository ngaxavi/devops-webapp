import { UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'angular-highcharts';
import { SeriesOptionsType } from 'highcharts';
import { take } from 'rxjs/operators';
import { DeviceService } from '../device.service';
import { MeasurementValue } from 'src/app/app.interface';

@Component({
  selector: 'app-device-value',
  template: ` <mat-progress-spinner
      mode="indeterminate"
      diameter="20"
      strokeWidth="50"
      *ngIf="isLoading"
    ></mat-progress-spinner>
    <div class="lg:container lg:mx-auto pt-2" *ngIf="!isLoading">
      <a
        routerLink="/devices"
        class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded inline-flex items-center"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" class="arrow-left w-6 h-6">
          <path
            fill-rule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span class="ml-1">Back</span>
      </a>
      <div class="flex content-start flex-wrap">
        <ng-container *ngFor="let chart of charts">
          <div class="w-full h-2/3 rounded overflow-hidden shadow-lg">
            <div class="px-6 py-4"></div>
            <div class="px-6 pt-2 pb-2">
              <div [chart]="chart"></div>
            </div>
          </div>
        </ng-container>
      </div>
    </div>`,
})
export class DeviceValueComponent implements OnInit {
  public charts: Chart[] = [];
  public isLoading: boolean;

  constructor(private readonly route: ActivatedRoute, private readonly deviceService: DeviceService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.isLoading = true;

    this.deviceService
      .getMeasurements(id)
      .pipe(take(1))
      .subscribe(
        (data) => {
          const metrics = [];

          metrics.push({
            name: 'Temperature',
            values: data.map((d: MeasurementValue) => [new Date(d.timestamp).getTime(), d.temperature]),
          });

          metrics.push({
            name: 'MeterValue',
            values: data.map((d: MeasurementValue) => [new Date(d.timestamp).getTime(), d.meterValue]),
          });

          for (const metric of metrics) {
            this.charts.push(
              new Chart({
                chart: { type: 'line', zoomType: 'x' },
                title: {
                  text: new UpperCasePipe().transform(metric.name),
                },
                xAxis: {
                  type: 'datetime',
                },
                legend: {
                  enabled: false,
                },
                credits: {
                  enabled: false,
                },
                series: [
                  {
                    name: metric.name,
                    data: metric.values,
                  } as SeriesOptionsType,
                ],
              }),
            );
          }
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          console.error(error);
        },
      );
  }
}
