import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-icon',
  templateUrl: './input.component.html'
})
export class InputComponent {
  @Input() svgPath: string | undefined;
  @Input() placeholder: string | undefined;
}
