import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export default class TablesComponent {
  sampleList: any[]=[];

  ngOnInit(){
    this.sampleList = [
      { "ipoName": "IP1456", "date": "04-Sep-2023", "Description": "Type FD2021", "poqty": "1200", "rate": "900" }
    ];

  }

}
