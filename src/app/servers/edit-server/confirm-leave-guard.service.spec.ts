import { TestBed } from '@angular/core/testing';

import { ConfirmLeaveGuard } from './confirm-leave-guard.service';

describe('ConfirmLeaveGuardService', () => {
  let service: ConfirmLeaveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmLeaveGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
