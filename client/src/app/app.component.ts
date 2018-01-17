import { Component } from '@angular/core';
import { DataService } from "./data.service";
import { InvigilatorService } from "./invigilator.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ DataService, InvigilatorService ]
})
export class AppComponent {

  constructor(private dataService: DataService) {}

  getCurrentUnit() {
    return this.dataService.getCurrentUnit();
  }
}
