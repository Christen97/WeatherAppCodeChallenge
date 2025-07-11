import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetarDisplayComponent } from './metar-display.component';

describe('MetarDisplayComponent', () => {
  let component: MetarDisplayComponent;
  let fixture: ComponentFixture<MetarDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MetarDisplayComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetarDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
