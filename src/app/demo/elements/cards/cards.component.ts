import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export default class CardsComponent {

}
