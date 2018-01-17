import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PhrasesComponent } from './phrases/phrases.component';
import { QuizSettingsComponent } from './quiz-settings/quiz-settings.component';
import { QuizComponent } from './quiz/quiz.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { QuizResultsComponent } from './quiz-results/quiz-results.component';
import { LanguageSelectionsComponent } from './language-selections/language-selections.component';

const appRoutes: Routes = [
  { path: 'quiz-results',   component: QuizResultsComponent },
  { path: 'quiz',           component: QuizComponent },
  { path: 'settings',       component: QuizSettingsComponent },
  { path: '',               component: PhrasesComponent },
  { path: '**',             component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PhrasesComponent,
    QuizSettingsComponent,
    QuizComponent,
    PageNotFoundComponent,
    QuizResultsComponent,
    LanguageSelectionsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
