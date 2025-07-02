import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private cache = new Map<String, any>();
  private cacheDurationMS = 5 * 60 * 1000;
  private cacheTimestamps = new Map<string, number>();

  constructor(private http: HttpClient) {}

  getWeather(icao: string) {
    const key = icao.toUpperCase().trim();
    const cached = this.cache.get(key);
    const timeStamp = this.cacheTimestamps.get(key);
    const isFresh = timeStamp && Date.now() - timeStamp < this.cacheDurationMS;

    if (cached && isFresh) {
      return of(cached);
    }

    return new Observable((observer) => {
      this.http.get(`http://localhost:5264/api/weather/${key}`).subscribe({
        next: (response) => {
          this.cache.set(key, response);
          this.cacheTimestamps.set(key, Date.now());
          observer.next(response);
          observer.complete();
        },
        error: (err) => observer.error(err),
      });
    });
  }
}
