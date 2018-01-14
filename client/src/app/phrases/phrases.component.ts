import {Component, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import { SearchService } from "../search.service";

@Component({
  selector: 'app-phrases',
  templateUrl: './phrases.component.html',
  styleUrls: ['./phrases.component.css'],
  providers: [ SearchService ]
})
export class PhrasesComponent implements OnInit {

  currentPhrases: Phrase[];
  query: string;

  constructor(private dataService: DataService, private searchService: SearchService) {}

  ngOnInit(): void {
    this.loadUnit(1);
  }

  search(event: any) {
    const query = event.target.value.trim().toLowerCase();
    if (query === "") {
      this.loadUnit(this.dataService.getCurrentUnit());
    } else if (query !== this.query) {
      this.query = query;
      this.currentPhrases = this.searchService.search(query);
    }
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
