import { Injectable } from '@angular/core';

@Injectable()
export class InvigilatorService {

  private quizPhrases: Phrase[];
  private currentPhrase: Phrase;
  private revealedType: string;
  private answerType: string;

  constructor() {
    this.revealedType = 'transliteration';
    this.answerType = 'english';
  }

  updatePhrase(): void {
    if (this.quizPhrases.length > 0) {
      const index = Math.floor(Math.random() * this.quizPhrases.length);
      const phrase = this.quizPhrases[index];
      this.quizPhrases.splice(index, 1);
      this.currentPhrase = phrase;
    } else {
      console.log("Error: No more quiz phrases remaining in unit");
    }
  }

  getRevealedPhrase(): string {
    return this.getPhrase(this.revealedType);
  }

  getAnswerPhrase(): string {
    return this.getPhrase(this.answerType);
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

  private getPhrase(type: string): string {
    if (type === "transliteration") {
      return this.currentPhrase.transliteration;
    } else if (type === "english") {
      return this.currentPhrase.english;
    } else if (type === "farsi") {
      return this.currentPhrase.farsi;
    } else {
      console.log("Error determining phrase type");
      return null;
    }
  }

}
