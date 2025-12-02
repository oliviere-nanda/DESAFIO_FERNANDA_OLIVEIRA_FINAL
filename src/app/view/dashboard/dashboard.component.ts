import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule, NgIf, NgFor],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  menuAberto = false;

  vehicles: any[] = [];
  selectedVehicle: any = null;

  // VIN input + debounce
  vinInput: string = '';
  currentVin: string = '';
  private vinTimer: any = null;

  vehicleData: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadVehicles();
  }

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }

  selectedVehicleId: number | null = null;

  loadVehicles() {
    this.http.get('http://localhost:3001/vehicles').subscribe({
      next: (res: any) => {
        this.vehicles = res.vehicles;

        // Seleciona o primeiro automaticamente
        if (this.vehicles.length > 0) {
          this.selectedVehicleId = this.vehicles[0].id;
          this.selectedVehicle = this.vehicles[0];
        }
      },
      error: err => console.error(err)
    });
  }

  onSelectVehicle() {
    const id = Number(this.selectedVehicleId);
    this.selectedVehicle = this.vehicles.find(v => v.id === id) || null;
  }

  /* VIN input com debounce: chama POST /vehicleData quando o usuário digita */
  onVinInput() {
    // limpa timeout anterior
    if (this.vinTimer) {
      clearTimeout(this.vinTimer);
    }

    // se vazio, limpa dados
    if (!this.vinInput || this.vinInput.trim().length === 0) {
      this.vehicleData = null;
      this.currentVin = '';
      return;
    }

    // debounce 700ms
    this.vinTimer = setTimeout(() => {
      const vin = this.vinInput.trim();
      // faz a chamada somente se VIN tiver pelo menos 5 caracteres (ajustável)
      if (vin.length < 5) return;

      this.currentVin = vin;
      this.http.post('http://localhost:3001/vehicleData', { vin })
        .subscribe({
          next: (res: any) => {
            // resposta esperada: { id, odometro, nivelCombustivel, status, lat, long }
            this.vehicleData = res;
          },
          error: (err) => {
            // VIN não encontrado ou erro
            console.warn('vehicleData error', err);
            this.vehicleData = null;
          }
        });
    }, 700);
  }
}
