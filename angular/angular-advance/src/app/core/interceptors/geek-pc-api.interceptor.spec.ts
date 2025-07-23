import { TestBed } from '@angular/core/testing';

import { GeekPcApiInterceptor } from './geek-pc-api.interceptor';

describe('GeekPcApiInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      GeekPcApiInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: GeekPcApiInterceptor = TestBed.inject(GeekPcApiInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
