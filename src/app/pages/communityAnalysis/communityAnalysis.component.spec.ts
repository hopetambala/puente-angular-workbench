import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityAnalysisComponent } from './communityAnalysis.component';

describe('CommunityAnalysisComponent', () => {
  let component: CommunityAnalysisComponent;
  let fixture: ComponentFixture<CommunityAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
