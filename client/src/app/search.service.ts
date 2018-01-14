import { Injectable } from '@angular/core';
import { DataService } from "./data.service";

@Injectable()
export class SearchService {

  constructor(private dataService: DataService) {}

  search(query: string): Phrase[] {

    const perfectMatches: Phrase[] = [];
    const containsWord: Phrase[] = [];
    const beginsWith: Phrase[] = [];
    const contains: Phrase[] = [];

    for (const phrase of this.dataService.getPhrases()) {

      if (this.perfectMatch(query, phrase)) {
        perfectMatches.push(phrase);
      } else if (this.containsWord(query, phrase)) {
        containsWord.push(phrase);
      } else if (this.beginsWith(query, phrase)) {
        beginsWith.push(phrase);
      } else if (this.contains(query, phrase)) {
        contains.push(phrase);
      }
    }

    return perfectMatches.concat(containsWord).concat(beginsWith).concat(contains);
  }

  private perfectMatch(query: string, phrase: Phrase) {
    return  phrase.english.toLowerCase() === query || phrase.transliteration.toLowerCase() === query;
  }

  private containsWord(query: string, phrase: Phrase) {
    const words: string[] = phrase.transliteration.split(' ').concat(phrase.english.split(' '));
    for (const word of words) {
      if (word.toLowerCase() === query) {
        return true;
      }
    }
    return false;
  }

  private beginsWith(query: string, phrase: Phrase) {
    return this.phraseBeginsWith(query, phrase.transliteration.toLowerCase()) ||
      this.phraseBeginsWith(query, phrase.english.toLowerCase());
  }

  private phraseBeginsWith(query: string, phrase: string) {
    if (phrase.length >= query.length) {
      return query === phrase.substring(0, query.length);
    }
    return false;
  }

  private contains(query: string, phrase: Phrase) {
    return phrase.transliteration.toLowerCase().includes(query) || phrase.english.toLowerCase().includes(query);
  }
}
