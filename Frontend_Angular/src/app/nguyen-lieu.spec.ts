import { TestBed } from '@angular/core/testing';

import { NguyenLieu } from './nguyen-lieu';

describe('NguyenLieu', () => {
  let service: NguyenLieu;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NguyenLieu);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
