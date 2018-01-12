import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {

  private phrases: Phrase[];

  private readonly unitSize: number;
  private url: string;
  private numberOfUnits: number;

  constructor(private http: HttpClient) {
    this.url = '/assets/phrases.json';
    this.unitSize = 5;
  }

  getUnit(unitNumber: number): Promise<Phrase[]> {
    return (this.phrases) ? this.getCachedData(unitNumber) : this.makeHttpRequest(unitNumber);
  }

  getNumberOfUnits() {
    return this.numberOfUnits;
  }

  private makeHttpRequest(unitNumber: number): Promise<Phrase[]> {
    console.log('making http request');
    return new Promise((resolve, reject) => {
      this.getData()
        .then((data) => {
          this.phrases = data.phrases;
          this.numberOfUnits = Math.ceil(this.phrases.length / this.unitSize);
          const unitPhrases = this.loadUnit(unitNumber, data.phrases);
          resolve(unitPhrases);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  private getData(): Promise<Phrases> {
    return this.http.get<Phrases>(this.url).toPromise();
  }

  private getCachedData(unitNumber: number): Promise<Phrase[]> {
    console.log('Returning cached phrases');
    return new Promise((resolve) => {
      const unitPhrases = this.loadUnit(unitNumber, this.phrases);
      resolve(unitPhrases);
    });

  }

  private loadUnit(unitNumber: number, phrases: Phrase[]): Phrase[] {
    const unitPhrases: Phrase[] = [];
    const start = (unitNumber - 1) * this.unitSize;
    const end = Math.min(start + this.unitSize, phrases.length);
    for (let i = start; i < end; i++) {
      unitPhrases.push(phrases[i]);
    }
    return unitPhrases;
  }
}

