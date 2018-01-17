import { Injectable } from '@angular/core';
import { DataService } from "./data.service";

@Injectable()
export class InvigilatorService {

  private quizPhrases: Phrase[];
  private revealedType: string;
  private answerType: string;

  constructor(private dataService: DataService) {
    this.revealedType = 'transliteration';
    this.answerType = 'english';
  }

  setRevealedType(revealedType: string) {
    this.revealedType = revealedType;
  }

  setAnswerType(answerType: string) {
    this.answerType = answerType;
  }

  loadQuizPhrases() {
    this.loadUnit(this.dataService.getCurrentUnit());
  }

  private loadUnit(unitNumber: number): void {
    this.dataService.getUnit(unitNumber)
      .then((data) => {
        this.quizPhrases = data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getQuizPhrases() {
    return this.quizPhrases;
  }

  getRevealedType() {
    return this.revealedType;
  }

  getAnswerType() {
    return this.answerType;
  }
}
