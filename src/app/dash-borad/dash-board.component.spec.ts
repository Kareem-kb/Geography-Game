import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashBoradComponent } from './dash-board.component';

describe('DashBoradComponent', () => {
  let component: DashBoradComponent;
  let fixture: ComponentFixture<DashBoradComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashBoradComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashBoradComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
