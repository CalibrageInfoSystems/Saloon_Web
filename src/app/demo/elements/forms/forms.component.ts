import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export default class FormsComponent {

}
