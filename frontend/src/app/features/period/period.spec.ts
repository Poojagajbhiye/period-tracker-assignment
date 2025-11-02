import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Period } from './period';

describe('Period', () => {
  let component: Period;
  let fixture: ComponentFixture<Period>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Period]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Period);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
