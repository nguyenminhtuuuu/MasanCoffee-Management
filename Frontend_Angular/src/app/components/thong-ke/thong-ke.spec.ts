import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongKe } from './thong-ke';

describe('ThongKe', () => {
  let component: ThongKe;
  let fixture: ComponentFixture<ThongKe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThongKe],
    }).compileComponents();

    fixture = TestBed.createComponent(ThongKe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
