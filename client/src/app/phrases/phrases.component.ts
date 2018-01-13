import {Component, OnInit} from '@angular/core';
import {DataService} from '../data.service';

@Component({
  selector: 'app-phrases',
  templateUrl: './phrases.component.html',
  styleUrls: ['./phrases.component.css']
})
export class PhrasesComponent implements OnInit {

  currentPhrases: Phrase[];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadUnit(1);
  }

  decrementUnit(): void {
    const currentUnit = this.dataService.getCurrentUnit();
    if (currentUnit > 1) {
      this.loadUnit(currentUnit - 1);
    }
  }

  incrementUnit(): void {
    const currentUnit = this.dataService.getCurrentUnit();
    if (currentUnit < this.dataService.getNumberOfUnits()) {
      this.loadUnit(currentUnit + 1);
    }
  }

  private loadUnit(unitNumber: number): void {
    this.dataService.getUnit(unitNumber)
      .then((data) => {
        this.currentPhrases = data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
