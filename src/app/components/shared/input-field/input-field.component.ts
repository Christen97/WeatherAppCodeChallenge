import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
})
export class InputFieldComponent implements OnInit {
  @Input() icao = '';
  @Input() loading = false;
  @Input() error: string | null = null;

  @Output() icaoChange = new EventEmitter<string>();
  @Output() search = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

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
