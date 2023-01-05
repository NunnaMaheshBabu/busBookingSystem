import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAvalComponent } from './show-aval.component';

describe('ShowAvalComponent', () => {
  let component: ShowAvalComponent;
  let fixture: ComponentFixture<ShowAvalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAvalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAvalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
