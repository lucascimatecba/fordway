import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc
} from '@angular/fire/firestore';
import { from, map, catchError, of, Observable } from 'rxjs';
import { Veiculo } from '../../shared/models/veiculo.model';
import { VehicleData } from '../../shared/models/vehicleData.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardPrivService {
  constructor(private firestore: Firestore) {}

  getVehicles(): Observable<Veiculo[]> {
    const vehiclesRef = collection(this.firestore, 'vehicles');
    return from(getDocs(vehiclesRef)).pipe(
      map(snapshot => snapshot.docs.map(doc => ({
        id: doc.id,
        vehicle: doc.get('vehicle'),
        volumetotal: doc.get('volumetotal'),
        connected: doc.get('connected'),
        softwareUpdates: doc.get('softwareUpdates'),
        img: doc.get('img')
      } as Veiculo))),
      catchError(error => {
        console.error('Error fetching vehicles:', error);
        return of([]);
      })
    );
  }

  getVehicleData(vin: string): Observable<VehicleData | null> {
    if (!vin || vin.length < 17) return of(null);

    const vehicleDataQuery = query(
      collection(this.firestore, 'vehicleData'),
      where('vin', '==', vin.toUpperCase())
    );

    return from(getDocs(vehicleDataQuery)).pipe(
      map(snapshot => {
        if (snapshot.empty) return null;
        const data = snapshot.docs[0].data();
        return {
          odometro: data['odometro'],
          nivelCombustivel: data['nivelCombustivel'],
          status: data['status'],
          lat: data['lat'],
          long: data['long']
        } as VehicleData;
      }),
      catchError(error => {
        console.error('Error fetching vehicle data:', error);
        return of(null);
      })
    );
  }
}
