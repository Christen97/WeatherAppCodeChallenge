import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Input() title = 'Weather';
  @Input() icao = '';
  @Input() loading = false;
  @Input() error: string | null = null;

  @Output() icaoChange = new EventEmitter<string>();
  @Output() search = new EventEmitter<void>();

  onSearchClick() {
    this.search.emit();
  }

  onIcaoChange(event: Event) {
    const value = (event.target as HTMLInputElement).value.toUpperCase();
    this.icaoChange.emit(value);
  }

  onEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.search.emit();
    }
  }
}
