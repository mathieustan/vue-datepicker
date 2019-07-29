import {
  computeYearsScrollPosition,
  computeAgendaHeight,
  getDynamicPosition,
} from '@/utils/positions';

describe('Utils: Functions', () => {
  const createDivParentWithChildren = (position = 'relative') => {
    const body = document.createElement('body');
    body.style.position = position;
    const activatorElement = document.createElement('div');
    activatorElement.setAttribute('class', 'activator');
    const element = document.createElement('div');
    element.setAttribute('class', 'element');
    Object.defineProperties(element, {
      offsetParent: { get: () => activatorElement },
    }, { writable: true });

    activatorElement.appendChild(element);
    element.style.height = '100px';
    element.style.width = '100px';

    document.body.appendChild(activatorElement);
    Object.defineProperties(activatorElement, {
      offsetParent: { get: () => body },
    }, { writable: true });
    document.documentElement.appendChild(body);

    return {
      body,
      activator: activatorElement,
      element,
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
        { width: 800, height: 800 }, // windowSize
        { offsetTop: 0, offsetLeft: 0 }, // target
        { width: 800, left: 0, bottom: 800 }, // targetRect
        { top: 700, left: 0, bottom: 700, width: 300, height: 50 }, // activatorRect
        { width: 100, height: 400 }, // elementSize
        { top: 300, left: 0, origin: 'bottom left' }, // result
      ],
      // Should place BELOW
      [
        { width: 800, height: 800 }, // windowSize
        { offsetTop: 0, offsetLeft: 0 }, // target
        { width: 800, left: 0, bottom: 800 }, // targetRect
        { top: 100, left: 0, bottom: 100, width: 300, height: 50 }, // activatorRect
        { width: 100, height: 100 }, // elementSize
        { top: 150, left: 0, origin: 'top left' }, // result
      ],
      // Should place BELOW in SPECIFIC TARGET
      [
        { width: 800, height: 800 }, // windowSize
        { offsetTop: 0, offsetLeft: 400 }, // target
        { width: 400, left: 400, bottom: 600 }, // targetRect
        { top: 100, left: 450, bottom: 100, width: 300, height: 50 }, // activatorRect
        { width: 100, height: 100 }, // elementSize
        { top: 150, left: 50, origin: 'top left' }, // result
      ],
      // Should place BELOW and LEFT if there is not enought place on right
      [
        { width: 800, height: 800 }, // windowSize
        { offsetTop: 0, offsetLeft: 0 }, // target
        { width: 800, left: 0, bottom: 800 }, // targetRect
        { top: 100, left: 500, bottom: 100, width: 300, height: 50 }, // activatorRect
        { width: 100, height: 100 }, // elementSize
        { top: 150, left: 700, origin: 'top right' }, // result
      ],
      // Should place ABOVE and LEFT if there is not enought place on right
      [
        { width: 800, height: 800 }, // windowSize
        { offsetTop: 0, offsetLeft: 0 }, // target
        { width: 800, left: 0, bottom: 800 }, // targetRect
        { top: 700, left: 500, bottom: 700, width: 300, height: 50 }, // activatorRect
        { width: 100, height: 100 }, // elementSize
        { top: 600, left: 700, origin: 'bottom right' }, // result
      ],
      // Should place BELOW and LEFT if there is not enought place on right and on left
      [
        { width: 800, height: 800 }, // windowSize
        { offsetTop: 0, offsetLeft: 0 }, // target
        { width: 800, left: 0, bottom: 800 }, // targetRect
        { top: 100, left: 300, bottom: 100, width: 300, height: 50 }, // activatorRect
        { width: 300, height: 100 }, // elementSize
        { top: 150, left: 300, origin: 'top left' }, // result
      ],
      // Should place ABOVE and LEFT if there is not enought place on right and on left
      [
        { width: 800, height: 800 }, // windowSize
        { offsetTop: 0, offsetLeft: 0 }, // target
        { width: 800, left: 0, bottom: 800 }, // targetRect
        { top: 700, left: 300, bottom: 700, width: 300, height: 50 }, // activatorRect
        { width: 300, height: 100 }, // elementSize
        { top: 600, left: 300, origin: 'bottom left' }, // result
      ],
      // Should place on LEFT
      [
        { width: 800, height: 500 }, // windowSize
        { offsetTop: 0, offsetLeft: 0 }, // target
        { width: 800, left: 0, bottom: 500 }, // targetRect
        { top: 250, left: 500, bottom: 250, width: 300, height: 50 }, // activatorRect
        { width: 400, height: 400 }, // elementSize
        { top: 50, left: 100, origin: 'right center' }, // result
      ],
      // Should place on RIGHT
      [
        { width: 800, height: 400 }, // windowSize
        { offsetTop: 0, offsetLeft: 0 }, // target
        { width: 800, left: 0, bottom: 400 }, // targetRect
        { top: 200, left: 50, bottom: 200, width: 300, height: 50 }, // activatorRect
        { width: 300, height: 300 }, // elementSize
        { top: 50, left: 350, origin: 'left center' }, // result
      ],
      // Should place MIDDLE
      [
        { width: 400, height: 400 }, // windowSize
        { offsetTop: 0, offsetLeft: 0 }, // target
        { width: 400, left: 0, bottom: 400 }, // targetRect
        { top: 200, left: 150, bottom: 200, width: 300, height: 50 }, // activatorRect
        { width: 300, height: 300 }, // elementSize
        { top: 50, left: 50, origin: 'center center' }, // result
      ],
    ])(
      'When windowSize = %p, target = %p, targetRect = %p, activator = %p, element = %p, should return %p',
      (windowSize, target, targetRect, activatorRect, elementSize, expectedResult) => {
        Object.defineProperties(window.HTMLElement.prototype, {
          offsetHeight: { get: () => elementSize.height },
          offsetWidth: { get: () => elementSize.width },
        }, { writable: true });

        global.pageXOffset = 0;
        global.pageXOffset = 0;
        global.innerWidth = windowSize.width;
        global.innerHeight = windowSize.height;

        const { activator, element, body } = createDivParentWithChildren();
        Object.defineProperties(body, {
          offsetTop: { get: () => target.offsetTop },
          offsetLeft: { get: () => target.offsetLeft },
        }, { writable: true });
        jest.spyOn(body, 'getBoundingClientRect').mockReturnValue(targetRect);
        jest.spyOn(activator, 'getBoundingClientRect').mockReturnValue(activatorRect);
        expect(getDynamicPosition(element, activator, body)).toEqual(expectedResult);
      },
    );

    it('should not add scrolltop if element parent is fixed', () => {
      const windowSize = { width: 800, height: 800 };
      const target = { offsetTop: 100, offsetLeft: 400 };
      const targetRect = { width: 400, left: 400, bottom: 700 };
      const activatorRect = { top: 200, left: 450, bottom: 250, width: 400, height: 50 };
      const elementSize = { width: 100, height: 100 };
      const expectedResult = { top: 250, left: 50, origin: 'top left' };

      Object.defineProperties(window.HTMLElement.prototype, {
        offsetHeight: { get: () => elementSize.height },
        offsetWidth: { get: () => elementSize.width },
      }, { writable: true });

      global.pageXOffset = 0;
      global.pageYOffset = 500;
      global.innerWidth = windowSize.width;
      global.innerHeight = windowSize.height;

      const { activator, element, body } = createDivParentWithChildren('fixed');
      Object.defineProperties(body, {
        offsetTop: { get: () => target.offsetTop },
        offsetLeft: { get: () => target.offsetLeft },
      }, { writable: true });
      jest.spyOn(body, 'getBoundingClientRect').mockReturnValue(targetRect);
      jest.spyOn(activator, 'getBoundingClientRect').mockReturnValue(activatorRect);

      expect(getDynamicPosition(element, activator, body)).toEqual(expectedResult);
    });
  });
});
