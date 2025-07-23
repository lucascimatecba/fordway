import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { from, map, catchError, of, Observable } from 'rxjs';
import { Veiculo } from '../../shared/models/veiculo.model';
import { VehicleData } from '../../shared/models/vehicleData.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardPrivService {
  constructor(private firestore: Firestore) {}

  /** Retorna a lista de veículos cadastrados no Firestore */
  getVehicles(): Observable<Veiculo[]> {
    const vehiclesRef = collection(this.firestore, 'vehicles');
    return from(getDocs(vehiclesRef)).pipe(
      map(snapshot => snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }) as Veiculo)),
      catchError(() => of([])) // retorna array vazio em caso de erro
    );
  }

  /** Busca dados adicionais de um veículo pelo VIN */
  getVehicleData(vin: string): Observable<VehicleData | null> {
    const vehicleDataQuery = query(
      collection(this.firestore, 'vehicleData'),
      where('vin', '==', vin)
    );

    return from(getDocs(vehicleDataQuery)).pipe(
      map(snapshot => {
        if (snapshot.empty) return null;
        return snapshot.docs[0].data() as VehicleData;
      }),
      catchError(() => of(null)) // retorna null em caso de erro
    );
  }
}
