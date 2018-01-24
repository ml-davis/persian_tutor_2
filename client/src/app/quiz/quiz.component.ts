import { Component, OnInit } from '@angular/core';
import { InvigilatorService } from "../invigilator.service";
import { ActivatedRoute, Params } from "@angular/router";
import { DataService } from "../data.service";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(private dataService: DataService, private invigilator: InvigilatorService, private router: ActivatedRoute) {}

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.dataService.setCurrentUnit(params['unit'] || 1);
      this.invigilator.setRevealedType(params['revealed'] || 'transliteration');
      this.invigilator.setAnswerType(params['answer'] || 'english');
      this.loadQuizPhrases();
    });
  }

  loadQuizPhrases(): void {
    this.loadUnit(this.dataService.getCurrentUnit());
  }

  private loadUnit(unitNumber: number): void {
    this.dataService.getUnit(unitNumber)
      .then((data) => {
        this.invigilator.setQuizPhrases(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
