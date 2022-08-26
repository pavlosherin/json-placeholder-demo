import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-link',
  template: `<a [routerLink]="link" mat-flat-button><ng-content></ng-content></a>`
})
export class ButtonLinkComponent {
  @Input() link?: string[] | undefined;
}
