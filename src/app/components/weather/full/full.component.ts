import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LookupService } from 'src/app/services/lookup.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
})
export class FullComponent {
  @ViewChild('observeMetar', { static: false }) observeMetar!: ElementRef;
  private metarObserver: IntersectionObserver | null = null;
  metarIsVisible: boolean = true;
  @ViewChild('observeTaf', { static: false }) observeTaf!: ElementRef;
  private tafObserver: IntersectionObserver | null = null;
  tafIsVisible: boolean = true;
  icao: string = '';
  metar: any = null;
  taf: any[] = [];
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
        this.fetchWeather(code);
      }
    });
  }

  ngAfterViewChecked() {
    if (this.observeMetar && !this.metarObserver) {
      this.metarObserver = new IntersectionObserver(
        ([entry]) => {
          this.metarIsVisible = entry.isIntersecting;
        },
        { root: null, threshold: 0.1 }
      );
      this.metarObserver.observe(this.observeMetar.nativeElement);
    }

    if (this.observeTaf && !this.tafObserver) {
      this.tafObserver = new IntersectionObserver(
        ([entry]) => {
          this.tafIsVisible = entry.isIntersecting;
        },
        { root: null, threshold: 0.1 }
      );
      this.tafObserver.observe(this.observeTaf.nativeElement);
    }
  }

  fetchWeather(code?: string) {
    const searchIcao = (code ?? this.icao).toUpperCase().trim();
    if (!searchIcao) return;

    this.metarObserver?.disconnect();
    this.metarObserver = null;

    this.tafObserver?.disconnect();
    this.tafObserver = null;

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
      },
    });
  }
}
