import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export default class ButtonsComponent {

}
