import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface RegionesJSON {
  regiones: {
    [key: string]: {
      nombre: string;
      valor: number;
      comunas: string[];
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class RegionesService {
  private readonly jsonUrl = 'assets/regiones-comunas.json';

  constructor(private http: HttpClient) {}

  getRegiones(): Observable<RegionesJSON> {
    return this.http.get<RegionesJSON>(this.jsonUrl);
  }

}
