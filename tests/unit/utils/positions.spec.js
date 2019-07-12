import {
  computeYearsScrollPosition,
  computeAgendaHeight,
  getDynamicPosition,
} from '@/utils/positions';

describe('Utils: Functions', () => {
  const createDivParentWithChildren = ({
    childrenWidth = '100px',
    childrenHeight = '100px',
  } = {}) => {
    const target = document.createElement('body');
    const parentElement = document.createElement('div');
    parentElement.setAttribute('class', 'parent');
    const childrenElement = document.createElement('div');
    childrenElement.setAttribute('class', 'children');

    parentElement.appendChild(childrenElement);
    childrenElement.style.height = childrenWidth;
    childrenElement.style.width = childrenHeight;

    target.appendChild(parentElement);

    return {
      target,
      parent: parentElement,
      element: childrenElement,
    };
  };

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

  describe('computeAgendaHeight', () => {
    it.each([
      [{ offsetHeight: 200 }, 'has-6-weeks', 200],
      [{ offsetHeight: 200 }, 'has-5-weeks', 236],
      [{ offsetHeight: 200 }, undefined, 236],
    ])(
      'When agenda = %p, classWeeks = %p, should return %p',
      (agenda, classWeeks, expectedResult) => {
        expect(computeAgendaHeight(agenda, classWeeks)).toEqual(expectedResult);
      },
    );
  });

  describe('getDynamicPosition', () => {
    it.each([
      // Should place ABOVE
      [
        { width: 800, height: 800 },
        { top: 700, left: 0, bottom: 700, width: 300, height: 50 },
        { offsetTop: 0, offsetLeft: 0 },
        { width: 100, height: 400 },
        { top: 300, left: 0, origin: 'bottom left' },
      ],
      // Should place BELOW
      [
        { width: 800, height: 800 },
        { top: 100, left: 0, bottom: 100, width: 300, height: 50 },
        { offsetTop: 0, offsetLeft: 0 },
        { width: 100, height: 100 },
        { top: 150, left: 0, origin: 'top left' },
      ],
      // Should place BELOW in SPECIFIC TARGET
      [
        { width: 800, height: 800 },
        { top: 100, left: 100, bottom: 100, width: 300, height: 50 },
        { offsetTop: 0, offsetLeft: 100 },
        { width: 100, height: 100 },
        { top: 150, left: 0, origin: 'top left' },
      ],
      // Should place BELOW and LEFT if there is not enought place on right
      [
        { width: 800, height: 800 },
        { top: 100, left: 500, bottom: 100, width: 300, height: 50 },
        { offsetTop: 0, offsetLeft: 0 },
        { width: 100, height: 100 },
        { top: 150, left: 700, origin: 'top right' },
      ],
      // Should place ABOVE and LEFT if there is not enought place on right
      [
        { width: 800, height: 800 },
        { top: 700, left: 500, bottom: 700, width: 300, height: 50 },
        { offsetTop: 0, offsetLeft: 0 },
        { width: 100, height: 100 },
        { top: 600, left: 700, origin: 'bottom right' },
      ],
      // Should place BELOW and CENTER if there is not enought place on right and on left
      [
        { width: 800, height: 800 },
        { top: 100, left: 300, bottom: 100, width: 300, height: 50 },
        { offsetTop: 0, offsetLeft: 0 },
        { width: 300, height: 100 },
        { top: 150, left: 250, origin: 'top center' },
      ],
      // Should place ABOVE and CENTER if there is not enought place on right and on left
      [
        { width: 800, height: 800 },
        { top: 700, left: 300, bottom: 700, width: 300, height: 50 },
        { offsetTop: 0, offsetLeft: 0 },
        { width: 300, height: 100 },
        { top: 600, left: 250, origin: 'bottom center' },
      ],
      // Should place on LEFT
      [
        { width: 800, height: 500 },
        { top: 250, left: 500, bottom: 250, width: 300, height: 50 },
        { offsetTop: 0, offsetLeft: 0 },
        { width: 400, height: 400 },
        { top: 50, left: 100, origin: 'right center' },
      ],
      // Should place on RIGHT
      [
        { width: 800, height: 400 },
        { top: 200, left: 50, bottom: 200, width: 300, height: 50 },
        { offsetTop: 0, offsetLeft: 0 },
        { width: 300, height: 300 },
        { top: 50, left: 350, origin: 'left center' },
      ],
      // Should place MIDDLE
      [
        { width: 400, height: 400 },
        { top: 200, left: 150, bottom: 200, width: 300, height: 50 },
        { offsetTop: 0, offsetLeft: 0 },
        { width: 300, height: 300 },
        { top: 50, left: 50, origin: 'center center' },
      ],
    ])(
      'should compute position to an element from parent and window',
      (windowSize, parentRect, targetRect, elementSize, expectedResult) => {
        Object.defineProperties(window.HTMLElement.prototype, {
          offsetHeight: { get: () => elementSize.height },
          offsetWidth: { get: () => elementSize.width },
        }, { writable: true });

        global.pageXOffset = 0;
        global.pageXOffset = 0;
        global.innerWidth = windowSize.width;
        global.innerHeight = windowSize.height;

        const { parent, element } = createDivParentWithChildren();
        jest.spyOn(parent, 'getBoundingClientRect').mockReturnValue(parentRect);
        expect(getDynamicPosition(element, parent, targetRect)).toEqual(expectedResult);
      },
    );
  });
});
