import { Component, Input } from '@angular/core';
import _ from 'lodash';

const randomColors = [
  '#93CADC',
  '#7BC2DB',
  '#8F4A2A',
  '#293211',
  '#CAD2C8'
];

@Component({
  selector: 'app-img-placeholder',
  template: `<svg
    [ngClass]="['bd-placeholder-img',additionalClass]"
    width="100%"
    [attr.height]="height"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Placeholder"
    preserveAspectRatio="xMidYMid slice"
    focusable="false"
  >
    <title>Placeholder</title>
    <rect width="100%" height="100%" [attr.fill]="color"></rect>
  </svg>`,
  styles: []
})
export class ImgPlaceholderComponent {
  @Input() color: string;
  @Input() additionalClass = '';
  @Input() height = 180;
  constructor() {
    this.color = (_.sample(randomColors) as string); // [_.random(0, randomColors.length - 1)]
  }
}
