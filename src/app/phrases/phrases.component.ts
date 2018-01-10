import {Component, OnInit} from '@angular/core';
import {DataService} from '../data.service';

@Component({
  selector: 'app-phrases',
  templateUrl: './phrases.component.html',
  styleUrls: ['./phrases.component.css'],
  providers: [ DataService ]
})
export class PhrasesComponent implements OnInit {

  currentUnit: number;
  currentPhrases: Phrase[];

  constructor(private dataService: DataService) {
    this.currentUnit = 1;
  }

  ngOnInit(): void {
    this.loadUnit(1);
  }

  decrementUnit(): void {
    if (this.currentUnit > 1) {
      this.loadUnit(--this.currentUnit);
    }
  }

  incrementUnit(): void {
    if (this.currentUnit < this.dataService.getNumberOfUnits()) {
      this.loadUnit(++this.currentUnit);
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
