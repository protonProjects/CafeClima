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
  private urlApi = 'http://localhost/cafeclima/api';

  constructor(private http: HttpClient) { }

  getClima(ciudad: string): Observable<any> {
    return this.http.get(`${this.urlClima}?q=${ciudad}&appid=${this.apiKeyClima}&units=metric&lang=es&cnt=1`);
  }

  getPrecioCafeEnCOP(precioUsd: number): Observable<{ formatted: string; precioCop: number; trmActual: number }> {
    return this.http.get(this.urlTrm).pipe(
      map((res: any) => {
        const trmActual = res.rates.COP;
        const precioCop = precioUsd * trmActual;
        return {
          formatted: new Intl.NumberFormat('es-CO', {
            style: 'currency', currency: 'COP', maximumFractionDigits: 0
          }).format(precioCop),
          precioCop,
          trmActual
        };
      })
    );
  }

  getMunicipios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlApi}/municipios/`);
  }

  crearMunicipio(nombre: string, departamento: string): Observable<any> {
    return this.http.post(`${this.urlApi}/municipios/`, { nombre, departamento });
  }

  eliminarMunicipio(id: number): Observable<any> {
    return this.http.delete(`${this.urlApi}/municipios/?id=${id}`);
  }

  guardarConsulta(payload: object): Observable<any> {
    return this.http.post(`${this.urlApi}/consultas/`, payload);
  }

  getHistorialConsultas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlApi}/consultas/`);
  }

  guardarPrecio(payload: object): Observable<any> {
    return this.http.post(`${this.urlApi}/precios/`, payload);
  }

  getHistorialPrecios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlApi}/precios/`);
  }
}