import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NamePlateComponent } from './name-plate.component';

describe('NamePlateComponent', () => {
  let component: NamePlateComponent;
  let fixture: ComponentFixture<NamePlateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NamePlateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NamePlateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
