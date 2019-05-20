import {
  computeYearsScrollPosition,
} from '@/utils';

describe('Utils: Functions', () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  describe('computeYearsScrollPosition', () => {
    it('should return currentYear position from element position', () => {
      const container = { offsetHeight: 200 };
      const elementToShow = { offsetTop: 250, offsetHeight: 50 };
      expect(computeYearsScrollPosition(container, elementToShow)).toEqual(175);
    });
  });
});
