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

  getQuizPhrases(): Phrase[] {
    return this.quizPhrases;
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
