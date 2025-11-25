import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Veiculo } from '../models/veiculo.model';

@Injectable({
  providedIn: 'root'
})
export class VeiculosService {
private apiUrl = 'http://localhost:3001/vehicles';

  constructor(private http: HttpClient) { }

  getVehicles(): Observable<{vehicles: Veiculo[]}> {
    return this.http.get<{vehicles: Veiculo[]}>(this.apiUrl);
  }

  getVehicleData(vin: string): Observable<any> {
    const url = 'http://localhost:3001/vehicleData';
    return this.http.post(url, { vin });
  }
}
