import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { kiemTraQuyenGuard } from './kiem-tra-quyen-guard';

describe('kiemTraQuyenGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => kiemTraQuyenGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
