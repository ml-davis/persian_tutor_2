import { Component, OnInit } from '@angular/core';
import { InvigilatorService } from '../invigilator.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  revealedPhrase: string;
  answerPhrase: string;
  currentPhraseNumber: number;
  unitSize: number;
  answerShown: boolean;
  isIncorrect: boolean;
  review: boolean;

  constructor(private dataService: DataService, private invigilator: InvigilatorService, private active: ActivatedRoute,
              private router: Router) {
    this.answerShown = false;
    this.isIncorrect = false;
    this.currentPhraseNumber = 1;
  }

  ngOnInit() {
    this.active.params.subscribe((params: Params) => {
      this.dataService.setCurrentUnit(params['unit'] || 1);
      this.invigilator.setRevealedType(params['revealed'] || 'transliteration');
      this.invigilator.setAnswerType(params['answer'] || 'english');
      this.review = params['review'];
      if (this.review) {
        this.invigilator.swapIncorrectPhrases();
        this.unitSize = this.invigilator.numberOfPhrases();
        this.getNextPhrase();
      } else {
        this.loadQuizPhrases();
        this.unitSize = this.dataService.getUnitSize();
      }
    });
  }

  loadQuizPhrases(): void {
    this.loadUnit(this.unitNumber());
  }

  showSolution(): void {
    this.answerShown = true;
  }

  next(): void {

    if (this.isIncorrect) {
      this.invigilator.insertIncorrectPhrase();
      this.isIncorrect = false;
    }

    if (this.currentPhraseNumber++ < this.unitSize) {
      this.answerShown = false;
      this.getNextPhrase();
    } else {
      this.router.navigate(['/quiz-results']);
    }
  }

  toggleIncorrect() {
    this.isIncorrect = !this.isIncorrect;
  }

  unitNumber(): number {
    return this.dataService.getCurrentUnit();
  }

  numberOfIncorrect(): number {
    return this.invigilator.numberOfIncorrect();
  }

  percentIncorrect(): string {
    const numberOfPhrases = this.currentPhraseNumber - 1;
    if (numberOfPhrases === 0) {
      return '-';
    } else {
      const numberCorrect = numberOfPhrases - this.numberOfIncorrect();
      const percentage = numberCorrect / numberOfPhrases * 100;
      return percentage.toFixed(1);
    }
  }

  private getNextPhrase(): void {
    this.invigilator.updatePhrase();
    this.revealedPhrase = this.invigilator.getRevealedPhrase();
    this.answerPhrase = this.invigilator.getAnswerPhrase();
  }

  private loadUnit(unitNumber: number): void {
    this.dataService.getUnit(unitNumber)
      .then((data) => {
        this.invigilator.setQuizPhrases(data);
        this.getNextPhrase();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
