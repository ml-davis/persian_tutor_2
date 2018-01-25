import { Component, OnInit } from '@angular/core';
import { InvigilatorService } from "../invigilator.service";

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.css']
})
export class QuizResultsComponent implements OnInit {

  constructor(private invigilator: InvigilatorService) {}

  ngOnInit() {
    console.log(this.invigilator.getIncorrectPhrases());
  }

}
