import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-newspaper-header',
  template: `<h1 class="newspaper-header">{{ title ?? '' }}</h1>`,
  styles: [
    '.newspaper-header { font-family: "Times New Roman", serif; font-size: 4.5rem; line-height: 4.5rem; font-weight: bold; text-align: center; margin: 2rem 1rem; text-transform: capitalize;}'
  ]
})
export class NewspaperHeaderComponent {
  @Input() title!: string | undefined;
}
