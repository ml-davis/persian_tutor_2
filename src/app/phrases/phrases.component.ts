import {Component, Input, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Phrase {
  transliteration: string;
  english: string;
  farsi: string;
}

interface Phrases {
  phrases: Phrase[];
}

@Component({
  selector: 'app-phrases',
  templateUrl: './phrases.component.html',
  styleUrls: ['./phrases.component.css']
})
export class PhrasesComponent implements OnInit {

  phrases: Phrase[];
  currentPhrases: Phrase[];
  unitSize: number;
  numberOfUnits: number;
  selectedUnit: number;

  constructor(private http: HttpClient) {
    this.unitSize = 10;
    this.selectedUnit = 1;
  }

  ngOnInit(): void {
    this.http.get<Phrases>('/assets/phrases.json').subscribe(data => {
      this.phrases = data.phrases;
      this.currentPhrases = this.getUnit(1);
      this.numberOfUnits = Math.ceil(this.phrases.length / this.unitSize);
    });
  }

  getUnit(unitNumber: number): Phrase[] {

    const unitPhrases: Phrase[] = [];
    const start = (unitNumber - 1) * this.unitSize;
    const end = Math.min(start + this.unitSize, this.phrases.length);

    for (let i = start; i < end; i++) {
      unitPhrases.push(this.phrases[i]);
    }
    return unitPhrases;
  }

  decrementUnit() {
    if (this.selectedUnit > 1) {
      this.currentPhrases = this.getUnit(--this.selectedUnit);
    }
  }

  incrementUnit() {
    if (this.selectedUnit < this.numberOfUnits) {
      this.currentPhrases = this.getUnit(++this.selectedUnit);
    }
  }
}
