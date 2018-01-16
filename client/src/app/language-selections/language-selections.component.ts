import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-language-selections',
  templateUrl: './language-selections.component.html',
  styleUrls: ['./language-selections.component.css']
})
export class LanguageSelectionsComponent implements OnInit {

  @Input() label: string;

  constructor() { }

  ngOnInit() {
  }

}
