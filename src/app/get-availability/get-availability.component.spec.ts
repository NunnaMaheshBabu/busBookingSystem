import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAvailabilityComponent } from './get-availability.component';

describe('GetAvailabilityComponent', () => {
  let component: GetAvailabilityComponent;
  let fixture: ComponentFixture<GetAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetAvailabilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
