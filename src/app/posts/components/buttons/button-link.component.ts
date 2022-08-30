import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-link',
  template: `<button
    [routerLink]="link"
    mat-flat-button
    [color]="color"
    [disabled]="disabled"
    [type]="type">
    <ng-content></ng-content>
  </button>`
})
export class ButtonLinkComponent {
  @Input() link?: string[] | undefined;
  @Input() color?: 'primary' | 'accent' | 'warn' | undefined = undefined;
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;
}
