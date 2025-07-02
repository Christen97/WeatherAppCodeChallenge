import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-metar-display',
  templateUrl: './metar-display.component.html',
})
export class MetarDisplayComponent {
  @Input() metar: any;
}
