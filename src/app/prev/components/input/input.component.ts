import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-input-icon',
  templateUrl: './input.component.html'
})
export class InputComponent {
  @Input() svgPath: string | undefined;
  @Input() placeholder: string | undefined;
  @Output() emitter = new EventEmitter<string>();
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  enviarDatos() {
    this.emitter.emit(this.input.nativeElement.value);
  }
}
