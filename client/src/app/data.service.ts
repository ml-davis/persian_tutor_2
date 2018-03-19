import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {

  private phrases: Phrase[];
  private readonly unitSize: number;
  private readonly url: string;

  private numberOfUnits: number;
  private currentUnit: number;

  constructor(private http: HttpClient) {
    this.url = 'http://persiantutor-env.us-east-2.elasticbeanstalk.com/phrases';
    this.unitSize = 100;
  }

  getUnit(unitNumber: number): Promise<Phrase[]> {
    return (this.phrases) ? this.getCachedData(unitNumber) : this.makeHttpRequest(unitNumber);
  }

  getPhrases() {
    return this.phrases;
  }

  getNumberOfUnits(): number {
    return this.numberOfUnits;
  }

  getCurrentUnit(): number {
    return this.currentUnit;
  }

  setCurrentUnit(unitNumber: number): void {
    this.currentUnit = unitNumber;
  }

  getUnitSize(): number {
    return this.unitSize;
  }

  private makeHttpRequest(unitNumber: number): Promise<Phrase[]> {
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
    return new Promise((resolve) => {
      const unitPhrases = this.loadUnit(unitNumber, this.phrases);
      resolve(unitPhrases);
    });
  }

  private loadUnit(unitNumber: number, phrases: Phrase[]): Phrase[] {
    this.currentUnit = unitNumber;

    const unitPhrases: Phrase[] = [];
    const startIndex = (unitNumber - 1) * this.unitSize;
    const endIndex = Math.min(startIndex + this.unitSize, phrases.length);
    for (let i = startIndex; i < endIndex; i++) {
      unitPhrases.push(phrases[i]);
    }
    return unitPhrases;
  }
}
