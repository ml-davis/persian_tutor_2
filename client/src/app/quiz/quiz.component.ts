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
    this.counter = 0;
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
    this.loadUnit(this.dataService.getCurrentUnit());
  }

  showSolution(): void {
    this.answerShown = true;
  }

  next(): void {
    if (++this.counter < this.dataService.getUnitSize()) {
      this.answerShown = false;
      this.getPhrase();
    } else {
      this.router.navigate(['/quiz-results']);
    }
  }

  private getPhrase() {
    const phrase = this.invigilator.getRandomPhrase();
    if (phrase) {
      this.revealedPhrase = phrase.transliteration;
      this.answerPhrase = phrase.english;
    }
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
