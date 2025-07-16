import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VeiculosAPI } from '../../shared/models/veiculo.model';
import { VehicleData } from '../../shared/models/vehicleData.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardPrivService {
  private readonly baseURL = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  getVehicle(): Observable<VeiculosAPI> {
    return this.http.get<VeiculosAPI> (`${this.baseURL}/vehicles`);
  }

  getVehicleData(vin: string): Observable<VehicleData> {
    return this.http.post<VehicleData>(`${this.baseURL}/vehicleData`, { vin });
  }
}
