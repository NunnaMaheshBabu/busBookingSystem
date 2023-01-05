import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusesUserComponent } from './buses-user.component';

describe('BusesUserComponent', () => {
  let component: BusesUserComponent;
  let fixture: ComponentFixture<BusesUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusesUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusesUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
