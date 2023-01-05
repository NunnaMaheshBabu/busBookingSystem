import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabilityUserComponent } from './availability-user.component';

describe('AvailabilityUserComponent', () => {
  let component: AvailabilityUserComponent;
  let fixture: ComponentFixture<AvailabilityUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailabilityUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailabilityUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
