import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // 1. REEMPLAZA ESTO CON TU API KEY REAL
  private apiKeyClima = 'T36d6025be46bef53cb6c9e938e81c71d'; 
  
  // APIs de referencia
  private urlClima = 'https://api.openweathermap.org/data/2.5/weather';
  private urlTrm = 'https://api.exchangerate-api.com/v4/latest/USD';

  constructor(private http: HttpClient) { }

  /**
 Obtiene el clima de una ciudad específica
   * @param ciudad 
   */
  getClima(ciudad: string): Observable<any> {
    const url = `${this.urlClima}?q=${ciudad}&appid=${this.apiKeyClima}&units=metric&lang=es`;
    return this.http.get(url);
  }

  /**
   * Obtiene el precio del café convertido a Pesos Colombianos
   * @param precioUsd El precio por libra en la bolsa (ej: 2.30)
   */
  getPrecioCafeEnCOP(precioUsd: number): Observable<string> {
    return this.http.get(this.urlTrm).pipe(
      map((res: any) => {
        const trmActual = res.rates.COP;
        const precioFinal = precioUsd * trmActual;
        
        // Formateamos como moneda colombiana
        return new Intl.NumberFormat('es-CO', {
          style: 'currency',
          currency: 'COP',
          maximumFractionDigits: 0
        }).format(precioFinal);
      })
    );
  }
}