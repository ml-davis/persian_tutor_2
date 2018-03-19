import { Component, OnInit } from '@angular/core';
import { InvigilatorService } from '../invigilator.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.css']
})
export class QuizResultsComponent implements OnInit {

  currentPhrases: Phrase[];
  isComplete: boolean;

  constructor(private dataService: DataService, private invigilator: InvigilatorService) {}

  ngOnInit() {
    this.currentPhrases = this.invigilator.getIncorrectPhrases();
    this.isComplete = this.currentPhrases.length === 0;
  }

  getData() {
    return {
      unit: this.dataService.getCurrentUnit(),
      revealed: this.invigilator.getRevealedType(),
      answer: this.invigilator.getAnswerType(),
      review: true
    };
  }
}
