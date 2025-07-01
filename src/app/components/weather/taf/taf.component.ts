import { Component } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { ActivatedRoute } from '@angular/router';
import { LookupService } from 'src/app/services/lookup.service';

@Component({
  selector: 'app-taf',
  templateUrl: './taf.component.html'
})
export class TafComponent {
  icao = '';
  taf: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private weatherService: WeatherService, private lookup: LookupService) { }

  ngOnInit() {
  this.route.queryParams.subscribe(params => {
    const code = params['icao'];
    if (code) {
      this.icao = code;
      this.fetchTaf(code);
    }
  });
}

  fetchTaf(code?: string) {
  const searchIcao = (code ?? this.icao).toUpperCase().trim();
  if (!searchIcao) return;

  this.loading = true;
  this.error = null;
  this.taf = [];

  this.weatherService.getWeather(searchIcao).subscribe({
    next: (response: any) => {
      //console.log('Weather response:', response);
      const forecast = response.data.report?.forecast;
      if (forecast?.conditions?.length) {
        this.taf = forecast.conditions;
      } else {
        this.error = 'No TAF data available.';
      }

      this.icao = searchIcao;
      console.log(this.taf)
      this.loading = false;
      this.lookup.addLookup(searchIcao)
    },
    error: () => {
      this.error = 'Failed to fetch data. Please check the ICAO code.';
      this.loading = false;
    }
  });
}

}
