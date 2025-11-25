import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { VeiculosService } from '../../services/veiculos.service';
import { Veiculo } from '../../models/veiculo.model';
import { NgIf, NgForOf, NgClass } from '@angular/common';
import { debounceTime, distinctUntilChanged, switchMap, of, catchError, Subject, Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  imports: [RouterModule, NgIf, NgForOf, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(private authService: AutenticacaoService, private router: Router, private veiculosService: VeiculosService) { }
  sidebarVisible = false;

  toggleSidebar(): void {
    this.sidebarVisible = !this.sidebarVisible;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  vehicles: Veiculo[] = [];
  selectedVehicle?: Veiculo;

  ngOnInit(): void {
    this.veiculosService.getVehicles().subscribe({
      next: (res) => {
        this.vehicles = res.vehicles;
        this.selectedVehicle = this.vehicles[0];
      },
      error: (err) => {
        console.error('Erro ao buscar veÃculos:', err);
      }
    });

    this.sub = this.searchVin$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((vin) => {
          if (!vin.trim()) {
            this.vehicleData = null;
            return of(null);
          }
          return this.veiculosService.getVehicleData(vin).pipe(
            catchError((err) => {
              if (err.status === 400) {
                alert('Código VIN não encontrado.');
              } else {
                alert('Erro ao buscar dados do veículo.');
              }
              return of(null);
            })
          );
        })
      )
      .subscribe((res) => {
        this.vehicleData = res;
      });
  }

  Select(id: string) {
    const found = this.vehicles.find(v => v.id === +id);
    if (found) {
      this.selectedVehicle = found;
    }
  }

  vin = '';
  vehicleData: any = null;
  errorMessage = '';
  private searchVin$ = new Subject<string>();
  private sub!: Subscription;


  Up() {
    this.searchVin$.next(this.vin);
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }


}
