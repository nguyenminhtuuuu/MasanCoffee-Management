import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KhoHangComponent } from './kho-hang';

describe('KhoHangComponent', () => {
  let component: KhoHangComponent;
  let fixture: ComponentFixture<KhoHangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KhoHangComponent], // standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(KhoHangComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});