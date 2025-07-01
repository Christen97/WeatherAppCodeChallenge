import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LookupService } from 'src/app/services/lookup.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html'
})
export class FullComponent {
  icao = '';
  metar: any = null;
  taf: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private weatherService: WeatherService, private lookup: LookupService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const code = params['icao'];
      if (code) {
        this.icao = code;
        this.fetchWeather(code);
      }
    });
    console.log(this.taf)
  }

  fetchWeather(code?: string) {
    const searchIcao = (code ?? this.icao).toUpperCase().trim();
    if (!searchIcao) return;

    this.loading = true;
    this.error = null;
    this.metar = null;
    this.taf = [];

    this.weatherService.getWeather(searchIcao).subscribe({
      next: (response: any) => {
        const report = response.data?.report;
        this.metar = report?.conditions;
        this.taf = report?.forecast?.conditions || [];
        this.icao = searchIcao;
        this.lookup.addLookup(searchIcao);
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to fetch weather data.';
        this.loading = false;
      }
    });
  }
}
