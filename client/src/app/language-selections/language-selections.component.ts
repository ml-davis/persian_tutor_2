import { Component, Input, OnInit } from '@angular/core';
import { InvigilatorService } from "../invigilator.service";

@Component({
  selector: 'app-language-selections',
  templateUrl: './language-selections.component.html',
  styleUrls: ['./language-selections.component.css']
})
export class LanguageSelectionsComponent implements OnInit {

  @Input() private type: string;

  constructor(private invigilator: InvigilatorService) {}

  ngOnInit() {}

  setSelection(type: string, selection: string): void {
    if (type === 'revealed') {
      this.invigilator.setRevealedType(selection);
    } else if (type === 'answer') {
      this.invigilator.setAnswerType(selection);
    } else {
      console.log('Error: unknown type selected when setting selection');
    }
  }

  isOpposingSelected(type: string, selection: string): boolean {
    if (type === 'revealed') {
      return this.invigilator.getAnswerType() === selection;
    } else if (type === 'answer') {
      return this.invigilator.getRevealedType() === selection;
    } else {
      console.log("Error: unknown type selected when disabling opposing button");
    }
  }

  isCurrentType(type: string, selection: string): boolean {
    if (type === 'revealed') {
      return this.invigilator.getRevealedType() === selection;
    } else if (type === 'answer') {
      return this.invigilator.getAnswerType() === selection;
    } else {
      console.log("Error: unknown type selected when disabling opposing button");
    }
  }

  titleCase(str): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
