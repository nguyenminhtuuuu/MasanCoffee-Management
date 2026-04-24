import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhanCong } from './phan-cong';

describe('PhanCong', () => {
  let component: PhanCong;
  let fixture: ComponentFixture<PhanCong>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhanCong],
    }).compileComponents();

    fixture = TestBed.createComponent(PhanCong);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
