import { Injectable } from '@angular/core';

@Injectable()
export class InvigilatorService {

  private quizPhrases: Phrase[];
  private revealedType: string;
  private answerType: string;

  constructor() {
    this.revealedType = 'transliteration';
    this.answerType = 'english';
  }

  getRandomPhrase(): Phrase {

    if (this.quizPhrases.length > 0) {

      const index = Math.floor(Math.random() * this.quizPhrases.length);
      const phrase = this.quizPhrases[index];
      this.quizPhrases.splice(index, 1);

      return phrase;

    } else {
      console.log("Error: No more quiz phrases remaining in unit");
      return null;
    }
  }

  setQuizPhrases(quizPhrases: Phrase[]): void {
    this.quizPhrases = quizPhrases;
  }

  getRevealedType(): string {
    return this.revealedType;
  }

  setRevealedType(revealedType: string): void {
    this.revealedType = revealedType;
  }

  getAnswerType(): string {
    return this.answerType;
  }

  setAnswerType(answerType: string): void {
    this.answerType = answerType;
  }

}
