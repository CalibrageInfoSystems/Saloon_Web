import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-element-color',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './element-color.component.html',
  styleUrls: ['./element-color.component.scss']
})
export default class ElementColorComponent {
}
