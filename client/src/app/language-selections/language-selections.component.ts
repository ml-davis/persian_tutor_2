import { Component, Input, OnInit } from '@angular/core';
import { InvigilatorService } from '../invigilator.service';

@Component({
  selector: 'app-language-selections',
  templateUrl: './language-selections.component.html',
  styleUrls: ['./language-selections.component.css']
})
export class LanguageSelectionsComponent implements OnInit {

  private types: string[] = [
    'transliteration',
    'english',
    'farsi'
  ];

  @Input() type: string;

  constructor(private invigilator: InvigilatorService) {}

  ngOnInit() {}

  setSelection(type: string, selection: string): void {
    if (type === 'revealed') {
      this.invigilator.setRevealedType(selection);

      const revealed_index = this.getIndex(selection);
      const answer_index = this.getIndex(this.invigilator.getAnswerType());
      if (revealed_index < 0 || answer_index < 0) {
        console.log('Error: setting selection');
      }
      this.invigilator.setAnswerType(this.types[this.getAnswerIndex(revealed_index, answer_index)]);

    } else if (type === 'answer') {
      this.invigilator.setAnswerType(selection);

    } else {
      console.log('Error: Unknown type selected');
    }
  }

  isOpposingSelected(type: string, selection: string): boolean {
    if (type === 'revealed') {
      return false;
    } else if (type === 'answer') {
      return this.invigilator.getRevealedType() === selection;
    } else {
      console.log('Error: unknown type selected when disabling opposing button');
    }
  }

  isCurrentType(type: string, selection: string): boolean {
    if (type === 'revealed') {
      return this.invigilator.getRevealedType() === selection;
    } else if (type === 'answer') {
      return this.invigilator.getAnswerType() === selection;
    } else {
      console.log('Error: unknown type selected when disabling opposing button');
    }
  }

  titleCase(str): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private getIndex(selection: string): number {
    for (let i = 0; i < this.types.length; i++) {
      if (selection === this.types[i]) {
        return i;
      }
    }
    return -1;
  }

  private getAnswerIndex(revealed_index: number, hidden_index: number): number {
    if (revealed_index === hidden_index) {
      hidden_index = (hidden_index + 1) % 3;
    }
    return hidden_index;
  }
}
