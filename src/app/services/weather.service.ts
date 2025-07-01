import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeather(icao: string) {
    return this.http.get(`http://localhost:5264/api/weather/${icao}`
    );
  }
}
