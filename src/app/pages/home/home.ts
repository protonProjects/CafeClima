import { Component, OnInit } from '@angular/core';
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
  clima: any;
  precioCafe: string = 'Cargando...';

  constructor(private dataService: DataService) {}

ngOnInit() {
  this.dataService.getClima('Manizales').subscribe({
    next: (res) => {

      const pronostico = res.list[0];

      const probabilidadLluvia = Math.round(pronostico.pop * 100);
      
      this.clima = {
        nombre: res.city.name,
        probabilidad: probabilidadLluvia,
        descripcion: pronostico.weather[0].description,
        mensaje: probabilidadLluvia > 50 ? '¡Pilas! Va a llover pronto.' : 'Cielo despejado por ahora.'
      };
    },
    error: (e) => console.error('Error clima:', e)
  });


    this.dataService.getPrecioCafeEnCOP(2.40).subscribe({
      next: (res) => this.precioCafe = res,
      error: (e) => console.error('Error café:', e)
    });
  }
}