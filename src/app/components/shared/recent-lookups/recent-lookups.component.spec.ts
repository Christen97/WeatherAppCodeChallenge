import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentLookupsComponent } from './recent-lookups.component';

describe('RecentLookupsComponent', () => {
  let component: RecentLookupsComponent;
  let fixture: ComponentFixture<RecentLookupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentLookupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentLookupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
