import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { LanguageSelectionsComponent } from "../language-selections/language-selections.component";
import { InvigilatorService } from "../invigilator.service";

@Component({
  selector: 'app-quiz-settings',
  templateUrl: './quiz-settings.component.html',
  styleUrls: ['./quiz-settings.component.css']
})
export class QuizSettingsComponent implements OnInit {

  @ViewChildren('type') components: QueryList<LanguageSelectionsComponent>;

  constructor(private invigilator: InvigilatorService) {}

  ngOnInit() {}

  loadQuizPhrases() {
    this.invigilator.loadQuizPhrases();
  }
}
