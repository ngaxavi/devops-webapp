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
  template: ` <div class="lg:container lg:mx-auto pt-2">
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

  constructor(private readonly route: ActivatedRoute, private readonly deviceService: DeviceService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.deviceService
      .getMeasurements(id)
      .pipe(take(1))
      .subscribe((data) => {
        console.log(data);

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
      });
  }
}
