import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiKeyClima = '36d6025be46bef53cb6c9e938e81c71d'; 
  private urlClima = 'https://api.openweathermap.org/data/2.5/forecast';
  private urlTrm = 'https://api.exchangerate-api.com/v4/latest/USD';

  constructor(private http: HttpClient) { }

  getClima(ciudad: string): Observable<any> {

  return this.http.get(`${this.urlClima}?q=${ciudad}&appid=${this.apiKeyClima}&units=metric&lang=es&cnt=1`);
}

  getPrecioCafeEnCOP(precioUsd: number): Observable<string> {
    return this.http.get(this.urlTrm).pipe(
      map((res: any) => {
        const trmActual = res.rates.COP;
        const precioFinal = precioUsd * trmActual;
        return new Intl.NumberFormat('es-CO', {
          style: 'currency', currency: 'COP', maximumFractionDigits: 0
        }).format(precioFinal);
      })
    );
  }
}