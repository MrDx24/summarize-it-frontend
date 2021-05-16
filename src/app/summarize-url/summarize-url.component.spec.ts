import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarizeUrlComponent } from './summarize-url.component';

describe('SummarizeUrlComponent', () => {
  let component: SummarizeUrlComponent;
  let fixture: ComponentFixture<SummarizeUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummarizeUrlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummarizeUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
