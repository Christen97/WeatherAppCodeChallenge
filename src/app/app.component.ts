import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LookupService } from './services/lookup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  lookupHistory: string[] = [];

  constructor(
    private lookup: LookupService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.lookup.history$.subscribe((history) => {
      this.lookupHistory = history;
    });
  }

  onLookupClick(code: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { icao: code },
      queryParamsHandling: 'merge',
    });
  }
}
