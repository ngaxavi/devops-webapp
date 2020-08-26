import { Occupant } from './../app.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TenantService {
  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Occupant[]> {
    return this.http.get<Occupant[]>(`/api/tenants/occupants`);
  }

  createOccupant(dto: any): Observable<Occupant> {
    return this.http.post<Occupant>('/api/tenants/occupants', dto);
  }

  updateOccupant(id: string, dto: any): Observable<Occupant> {
    return this.http.put<Occupant>(`/api/tenants/occupants/${id}`, dto);
  }

  deleteOccupant(id: string): Observable<string> {
    return this.http.delete(`/api/tenants/occupants/${id}`, { responseType: 'text' });
  }
}
