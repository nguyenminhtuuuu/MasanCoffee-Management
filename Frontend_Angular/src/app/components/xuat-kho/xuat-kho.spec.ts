import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XuatKhoComponent } from './xuat-kho';

describe('XuatKho', () => {
  let component: XuatKhoComponent;
  let fixture: ComponentFixture<XuatKhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XuatKhoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(XuatKhoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
