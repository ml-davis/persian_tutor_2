import { Component, OnInit } from '@angular/core';
import { InvigilatorService } from "../invigilator.service";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(private invigilator: InvigilatorService) {
  }

  ngOnInit() {
    console.log(this.invigilator.getRevealedType());
    console.log(this.invigilator.getAnswerType());
    console.log(this.invigilator.getQuizPhrases());
  }

}
