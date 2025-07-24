import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { VehicleData } from '../../../shared/models/vehicleData.model';
import { Veiculo } from '../../../shared/models/veiculo.model';
import { DashboardPrivService } from '../../../core/services/dashboard-priv.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { catchError, debounceTime, filter, switchMap, of, takeUntil } from 'rxjs';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard-priv',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  templateUrl: './dashboard-priv.component.html',
  styleUrls: ['./dashboard-priv.component.css']
})
export class DashboardPrivComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  vehicles: Veiculo[] = [];
  selectedVehicle: Veiculo | null = null;
  vehicleData: VehicleData | null = null;
  vinInvalido = false;
  isLoading = false;
  errorMessage = '';

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
    this.loadVehicles();
    this.setupCarSelection();
    this.setupVinSearch();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadVehicles(): void {
    this.isLoading = true;
    this.dashboardService.getVehicles()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.vehicles = res;
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = 'Erro ao carregar veículos';
          this.isLoading = false;
        }
      });
  }

  private setupCarSelection(): void {
    this.selectCarForms.controls.carId.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((id) => {
        const selected = this.vehicles.find(v => v.id === id);
        this.selectedVehicle = selected || null;

        if (this.selectedVehicle) {
          this.updateCards(this.selectedVehicle);
        }
      });
  }

  private updateCards(vehicle: Veiculo): void {
    this.cards = [
      { titulo: 'Vendas', valor: Number(vehicle.volumetotal) || 0 },
      { titulo: 'Conectados', valor: Number(vehicle.connected) || 0 },
      { titulo: 'Atualizados', valor: Number(vehicle.softwareUpdates) || 0 }
    ];
  }

  private setupVinSearch(): void {
    this.vinForm.controls.vin.valueChanges.pipe(
      debounceTime(500),
      filter((vin: string | null) => {
        if (!vin || vin.length < 17) {
          this.vehicleData = null;
          this.vinInvalido = false;
          return false;
        }
        return true;
      }),
      switchMap(vin => {
        this.isLoading = true;
        return this.dashboardService.getVehicleData(vin!).pipe(
          catchError(() => {
            this.isLoading = false;
            this.vinInvalido = true;
            return of(null);
          })
        );
      }),
      takeUntil(this.destroy$)
    ).subscribe((data) => {
      this.isLoading = false;
      this.vehicleData = data;
      this.vinInvalido = data === null;
    });
  }
}
