import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LookupService } from 'src/app/services/lookup.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-metar',
  templateUrl: './metar.component.html',
})
export class MetarComponent {
  icao = '';
  metar: any = null;
  loading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherService,
    private lookup: LookupService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const code = params['icao'];
      if (code) {
        this.icao = code;
        this.fetchMetar(code);
      }
    });
  }

  fetchMetar(code?: string) {
    const searchIcao = (code ?? this.icao).toUpperCase().trim();
    if (!searchIcao) return;

    this.loading = true;
    this.error = null;
    this.metar = null;

    this.weatherService.getWeather(searchIcao).subscribe({
      next: (response: any) => {
        const conditions = response.data.report?.conditions;
        if (conditions) {
          this.metar = conditions;
        } else {
          this.error = 'No METAR data available.';
        }
        this.icao = searchIcao;

        this.loading = false;
        this.lookup.addLookup(searchIcao);
      },
      error: () => {
        this.error = 'Failed to fetch data. Please check the ICAO code.';
        this.loading = false;
      },
    });
  }
}
