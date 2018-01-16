import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageSelectionsComponent } from './language-selections.component';

describe('LanguageSelectionsComponent', () => {
  let component: LanguageSelectionsComponent;
  let fixture: ComponentFixture<LanguageSelectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageSelectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageSelectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
