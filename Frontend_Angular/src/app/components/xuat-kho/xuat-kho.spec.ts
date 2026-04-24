import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XuatKho } from './xuat-kho';

describe('XuatKho', () => {
  let component: XuatKho;
  let fixture: ComponentFixture<XuatKho>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XuatKho],
    }).compileComponents();

    fixture = TestBed.createComponent(XuatKho);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
