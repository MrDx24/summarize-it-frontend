import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySummarizerComponent } from './my-summarizer.component';

describe('MySummarizerComponent', () => {
  let component: MySummarizerComponent;
  let fixture: ComponentFixture<MySummarizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySummarizerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MySummarizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
