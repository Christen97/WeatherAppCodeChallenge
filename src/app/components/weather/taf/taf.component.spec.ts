import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TafComponent } from './taf.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { LookupService } from 'src/app/services/lookup.service';
import { WeatherService } from 'src/app/services/weather.service';

describe('TafComponent', () => {
  let component: TafComponent;
  let fixture: ComponentFixture<TafComponent>;
  let weatherServiceSpy: jasmine.SpyObj<WeatherService>;
  let lookupServiceSpy: jasmine.SpyObj<LookupService>;

  beforeEach(async () => {
    weatherServiceSpy = jasmine.createSpyObj('WeatherService', ['getWeather']);
    lookupServiceSpy = jasmine.createSpyObj('LookupService', ['addLookup']);

    await TestBed.configureTestingModule({
      declarations: [TafComponent],
      providers: [
        { provide: WeatherService, useValue: weatherServiceSpy },
        { provide: LookupService, useValue: lookupServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ icao: 'EKOD' }), // simulate query param
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set taf data on successful fetch', () => {
    const mockData = {
      data: {
        report: {
          forecast: {
            conditions: [{ some: 'condition' }],
          },
        },
      },
    };

    weatherServiceSpy.getWeather.and.returnValue(of(mockData));

    component.fetchTaf('EKOD');

    expect(component.taf.length).toBe(1);
    expect(component.error).toBeNull();
  });
});
