import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinhLuong } from './tinh-luong';

describe('TinhLuong', () => {
  let component: TinhLuong;
  let fixture: ComponentFixture<TinhLuong>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TinhLuong],
    }).compileComponents();

    fixture = TestBed.createComponent(TinhLuong);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
