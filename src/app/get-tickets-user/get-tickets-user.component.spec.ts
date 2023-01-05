import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTicketsUserComponent } from './get-tickets-user.component';

describe('GetTicketsUserComponent', () => {
  let component: GetTicketsUserComponent;
  let fixture: ComponentFixture<GetTicketsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetTicketsUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetTicketsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
