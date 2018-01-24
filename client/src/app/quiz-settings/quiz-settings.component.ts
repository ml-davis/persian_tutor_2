import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { LanguageSelectionsComponent } from "../language-selections/language-selections.component";
import { InvigilatorService } from "../invigilator.service";
import { ActivatedRoute, Params } from "@angular/router";
import { DataService } from "../data.service";

@Component({
  selector: 'app-quiz-settings',
  templateUrl: './quiz-settings.component.html',
  styleUrls: ['./quiz-settings.component.css']
})
export class QuizSettingsComponent implements OnInit {

  @ViewChildren('type') components: QueryList<LanguageSelectionsComponent>;

  constructor(private dataService: DataService, private invigilator: InvigilatorService, private router: ActivatedRoute) {}

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.dataService.setCurrentUnit(params['unit'] || 1);
    });
  }

  getCurrentUnit(): number {
    return this.dataService.getCurrentUnit();
  }

  getRevealedType(): string {
    return this.invigilator.getRevealedType();
  }

  getAnswerType(): string {
    return this.invigilator.getAnswerType();
  }
}
