import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { VehicleData } from '../../../shared/models/vehicleData.model';
import { Veiculo } from '../../../shared/models/veiculo.model';
import { DashboardPrivService } from '../../../core/services/dashboard-priv.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { catchError, debounceTime, filter, switchMap, of } from 'rxjs';

@Component({
  selector: 'app-dashboard-priv',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  templateUrl: './dashboard-priv.component.html',
  styleUrl: './dashboard-priv.component.css'
})
export class DashboardPrivComponent implements OnInit {
  vehicles: Veiculo[] = [];
  selectedVehicle!: Veiculo;
  vehicleData!: VehicleData | undefined;
  vinInvalido = false;

  cards = [
    { titulo: 'Vendas', valor: 0 },
    { titulo: 'Conectados', valor: 0 },
    { titulo: 'Atualizados', valor: 0 }
  ];

  selectCarForms = new FormGroup({
    carId: new FormControl('')
  });

  vinForm = new FormGroup({
    vin: new FormControl('')
  });

  constructor(private dashboardService: DashboardPrivService) { }

  ngOnInit(): void {
    this.dashboardService.getVehicles().subscribe((res) => {
      this.vehicles = res;
    });

    this.selectCarForms.controls.carId.valueChanges.subscribe((id) => {
      const selected = this.vehicles.find(v => v.id == id);
      if (!selected) return;

      this.selectedVehicle = selected;

      this.cards = [
        { titulo: 'Vendas', valor: Number(this.selectedVehicle.volumetotal) },
        { titulo: 'Conectados', valor: Number(this.selectedVehicle.connected) },
        { titulo: 'Atualizados', valor: Number(this.selectedVehicle.softwareUpdates) }
      ];
    });

    this.vinForm.controls.vin.valueChanges.pipe(
      debounceTime(300),
      filter((vin: string | null) => {
        if (!vin || vin.length < 20) {
          this.vehicleData = undefined;
          this.vinInvalido = false;
          return false; // não prossegue
        }
        return true; // só continua se tiver 20+ caracteres
      }),
      switchMap(vin => this.dashboardService.getVehicleData(vin!).pipe(
        catchError((err) => {
          this.vehicleData = undefined as any;
          this.vinInvalido = true;
          return of(null);
        })
      ))
    ).subscribe((data) => {
      if (data) {
        this.vehicleData = data;
        this.vinInvalido = false;
      }
    });
  }
}

