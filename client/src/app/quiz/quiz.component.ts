import { Component, OnInit } from '@angular/core';
import { InvigilatorService } from "../invigilator.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { DataService } from "../data.service";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  revealedPhrase: string;
  answerPhrase: string;
  answerShown: boolean;
  counter: number;

  constructor(private dataService: DataService, private invigilator: InvigilatorService, private active: ActivatedRoute,
              private router: Router) {
    this.answerShown = false;
    this.counter = 1;
  }

  ngOnInit() {
    this.active.params.subscribe((params: Params) => {
      this.dataService.setCurrentUnit(params['unit'] || 1);
      this.invigilator.setRevealedType(params['revealed'] || 'transliteration');
      this.invigilator.setAnswerType(params['answer'] || 'english');
      this.loadQuizPhrases();
    });
  }

  loadQuizPhrases(): void {
    this.loadUnit(this.unitNumber());
  }

  showSolution(): void {
    this.answerShown = true;
  }

  next(): void {
    if (this.counter++ < this.unitSize()) {
      this.answerShown = false;
      this.getPhrase();
    } else {
      this.router.navigate(['/quiz-results']);
    }
  }

  unitSize(): number {
    return this.dataService.getUnitSize();
  }

  unitNumber(): number {
    return this.dataService.getCurrentUnit();
  }

  private getPhrase(): void {
    this.invigilator.updatePhrase();
    this.revealedPhrase = this.invigilator.getRevealedPhrase();
    this.answerPhrase = this.invigilator.getAnswerPhrase();
  }

  private loadUnit(unitNumber: number): void {
    this.dataService.getUnit(unitNumber)
      .then((data) => {
        this.invigilator.setQuizPhrases(data);
        this.getPhrase();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
