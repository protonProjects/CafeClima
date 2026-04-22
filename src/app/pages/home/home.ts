import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  clima = signal<any>(null);
  errorClima = signal<string>('');
  precioCafe = signal<any>(null);
  errorPrecio = signal<string>('');

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getClima('Manizales').subscribe({
      next: (res) => {
        const pronostico = res.list[0];
        const probabilidadLluvia = Math.round(pronostico.pop * 100);
        const temperatura = pronostico.main.temp;
        this.clima.set({
          nombre: res.city.name,
          probabilidad: probabilidadLluvia,
          descripcion: pronostico.weather[0].description,
          temperatura,
          mensaje: probabilidadLluvia > 50 ? '¡Pilas! Va a llover pronto.' : 'Cielo despejado por ahora.'
        });
        this.dataService.guardarConsulta({
          id_municipio: 1,
          probabilidad_lluvia: probabilidadLluvia,
          descripcion: pronostico.weather[0].description,
          temperatura
        }).subscribe({ error: (e) => console.error('Error guardando consulta:', e) });
      },
      error: (e) => {
        console.error('Error clima:', e);
        this.errorClima.set('No se pudo cargar el clima. Revise su conexión.');
      }
    });

    this.dataService.getPrecioCafeEnCOP(2.40).subscribe({
      next: (res) => {
        this.precioCafe.set(res);
        this.dataService.guardarPrecio({
          precio_usd: 2.40,
          precio_cop: res.precioCop,
          tasa_cambio: res.trmActual
        }).subscribe({ error: (e) => console.error('Error guardando precio:', e) });
      },
      error: (e) => {
        console.error('Error precio:', e);
        this.precioCafe.set(null);
        this.errorPrecio.set('No se pudo cargar el precio.');
      }
    });
  }
}
