import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Building, Flat } from '../app.interface';

@Injectable({ providedIn: 'root' })
export class BuildingService {
  rootApi: string;

  constructor(private readonly http: HttpClient) {
    this.rootApi = '/api/buildings';
  }

  getAll(): Observable<Building[]> {
    return this.http.get<Building[]>(this.rootApi);
  }

  getAllFlats(): Observable<Flat[]> {
    return this.http.get<Flat[]>(`${this.rootApi}/flats`);
  }

  createBuilding(dto: Building): Observable<Building> {
    return this.http.post<Building>(this.rootApi, dto);
  }

  createFlat(dto: Flat): Observable<Flat> {
    return this.http.post<Flat>(`${this.rootApi}/flats`, dto);
  }

  updateBuilding(id: string, dto: Building): Observable<Building> {
    return this.http.put<Building>(`${this.rootApi}/${id}`, dto);
  }

  updateFlat(id: string, dto: Flat): Observable<Flat> {
    return this.http.put<Flat>(`${this.rootApi}/flats/${id}`, dto);
  }

  deleteBuilding(id: string): Observable<string> {
    return this.http.delete(`${this.rootApi}/${id}`, { responseType: 'text' });
  }

  deleteFlat(id: string): Observable<string> {
    return this.http.delete(`${this.rootApi}/flats/${id}`, { responseType: 'text' });
  }
}
