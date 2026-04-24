import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhoHang } from './kho-hang';

describe('KhoHang', () => {
  let component: KhoHang;
  let fixture: ComponentFixture<KhoHang>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KhoHang],
    }).compileComponents();

    fixture = TestBed.createComponent(KhoHang);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
