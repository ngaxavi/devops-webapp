import { Device, MeasurementValue } from './../app.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Device[]> {
    return this.http.get<Device[]>('/api/devices');
  }

  getOne(deviceId: string): Observable<Device> {
    return this.http.get<Device>(`/api/devices/${deviceId}`);
  }

  updateOne(deviceId: string, dto: any): Observable<Device> {
    return this.http.put<Device>(`/api/devices/${deviceId}`, dto);
  }

  getMeasurements(deviceId: string): Observable<MeasurementValue[]> {
    return this.http.get<MeasurementValue[]>(`/api/devices/${deviceId}/measurements`);
  }
}
