import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialpageComponent } from './tutorialpage.component';

describe('TutorialpageComponent', () => {
  let component: TutorialpageComponent;
  let fixture: ComponentFixture<TutorialpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorialpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
