import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-taf-display',
  templateUrl: './taf-display.component.html'
})
export class TafDisplayComponent {
  @Input() taf: any[] = [];
}
