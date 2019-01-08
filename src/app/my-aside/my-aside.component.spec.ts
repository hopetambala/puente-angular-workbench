import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAsideComponent } from './my-aside.component';

describe('MyAsideComponent', () => {
  let component: MyAsideComponent;
  let fixture: ComponentFixture<MyAsideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAsideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
