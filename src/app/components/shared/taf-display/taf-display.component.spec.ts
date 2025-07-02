import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TafDisplayComponent } from './taf-display.component';

describe('TafDisplayComponent', () => {
  let component: TafDisplayComponent;
  let fixture: ComponentFixture<TafDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TafDisplayComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TafDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
