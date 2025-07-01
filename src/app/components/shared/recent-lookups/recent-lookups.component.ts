import { Component, Output, EventEmitter } from '@angular/core';
import { LookupService } from 'src/app/services/lookup.service';

@Component({
  selector: 'app-recent-lookups',
  templateUrl: './recent-lookups.component.html'
})
export class RecentLookupsComponent {
  lookups$ = this.lookupService.history$;

  @Output() lookupSelected = new EventEmitter<string>();

  constructor(private lookupService: LookupService) {}

  select(code: string) {
    this.lookupSelected.emit(code);
  }
}
