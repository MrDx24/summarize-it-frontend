import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarizeFileComponent } from './summarize-file.component';

describe('SummarizeFileComponent', () => {
  let component: SummarizeFileComponent;
  let fixture: ComponentFixture<SummarizeFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummarizeFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummarizeFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
