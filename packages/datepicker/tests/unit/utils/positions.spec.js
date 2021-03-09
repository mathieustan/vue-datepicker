import {
  getTopColPosition,
  computeYearsScrollPosition,
  computeAgendaHeight,
  detectFixedActivator,
  getInnerWidth,
  getInnerHeight,
  getOffsetLeft,
  getOffsetTop,
  getRoundedBoundedClientRect,
  measure,
} from '@/utils/positions';

describe('Utils: Functions', () => {
  const createElement = (boundingRect = {}) => {
    const element = document.createElement('div');
    jest.spyOn(element, 'getBoundingClientRect').mockReturnValue(boundingRect);
    return element;
  };

  const createDivParentWithChildren = (position = 'relative') => {
    const body = document.createElement('body');
    body.style.position = position;

    const activatorElement = document.createElement('div');
    activatorElement.setAttribute('class', 'activator');

    document.body.appendChild(activatorElement);
    Object.defineProperties(activatorElement, {
      offsetParent: { get: () => body },
    }, { writable: true });
    document.documentElement.appendChild(body);

    return {
      body,
      activator: activatorElement,
    };
  };

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  describe('getTopColPosition', () => {
    [{
      description: 'return first col when colYs are filled with 0 values',
      colYs: [0, 0, 0],
      expectedResult: { col: 0, y: 0 },
    }, {
      description: 'return lowest column',
      colYs: [100, 0, 0],
      expectedResult: { col: 1, y: 0 },
    }, {
      description: 'return lowest column',
      colYs: [100, 200, 125],
      expectedResult: { col: 0, y: 100 },
    }].forEach(({ description, colYs, expectedResult }) => {
      it(`should ${description}`, () => {
        expect(getTopColPosition(colYs)).toEqual(expectedResult);
      });
    });
  });

  describe('computeYearsScrollPosition', () => {
    [{
      description: 'calcul position from activeItem',
      options: {
        container: { scrollHeight: 200, offsetHeight: 0 },
        activeItem: { offsetTop: 250, offsetHeight: 50 },
      },
      // activeItem.offsetTop - container.offsetHeight / 2 + activeItem.offsetHeight / 2;
      expectedResult: 250 - 0 + 25,
    }, {
      description: 'if min or max is set but without an active year, should scroll to top',
      options: {
        container: { scrollHeight: 200, offsetHeight: 0 },
        min: '2017',
      },
      expectedResult: 0,
    }, {
      description: 'scroll to middle by default',
      options: {
        container: { scrollHeight: 200, offsetHeight: 0 },
      },
      expectedResult: 100,
    }].forEach(({ description, options, expectedResult }) => {
      it(`should ${description}`, () => {
        expect(computeYearsScrollPosition(options)).toEqual(expectedResult);
      });
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

  describe('detectFixedActivator', () => {
    [{
      description: 'return false if activator & parents arent fixed',
      position: 'relative',
      expectedResult: false,
    }, {
      description: 'return true if parent activator is fixed',
      position: 'fixed',
      expectedResult: true,
    }].forEach(({ description, position, expectedResult }) => {
      it(`should ${description}`, () => {
        const { activator } = createDivParentWithChildren(position);
        expect(detectFixedActivator(activator)).toEqual(expectedResult);
      });
    });
  });

  describe('getInnerWidth', () => {
    [{
      description: 'return window innerWidth',
      innerWidth: 800,
      clientWidth: 300,
      expectedResult: 800,
    }, {
      description: 'return document clientWidth if innerWidth not defined',
      innerWidth: undefined,
      clientWidth: 300,
      expectedResult: 300,
    }].forEach(({ description, innerWidth, clientWidth, expectedResult }) => {
      it(`should ${description}`, () => {
        global.innerWidth = innerWidth;
        Object.defineProperty(window.HTMLElement.prototype, 'clientWidth', {
          value: clientWidth,
          configurable: true,
        });
        expect(getInnerWidth()).toEqual(expectedResult);
      });
    });
  });

  describe('getInnerHeight', () => {
    [{
      description: 'return window innerHeight',
      innerHeight: 800,
      clientHeight: 300,
      expectedResult: 800,
    }, {
      description: 'return document clientHeight if innerHeight not defined',
      innerHeight: undefined,
      clientHeight: 300,
      expectedResult: 300,
    }].forEach(({ description, innerHeight, clientHeight, expectedResult }) => {
      it(`should ${description}`, () => {
        global.innerHeight = innerHeight;
        Object.defineProperty(window.HTMLElement.prototype, 'clientHeight', {
          value: clientHeight,
          configurable: true,
        });
        expect(getInnerHeight()).toEqual(expectedResult);
      });
    });
  });

  describe('getOffsetLeft', () => {
    [{
      description: 'return window pageXOffset',
      pageXOffset: 800,
      scrollLeft: 300,
      expectedResult: 800,
    }, {
      description: 'return document scrollLeft if pageXOffset not defined',
      pageXOffset: undefined,
      scrollLeft: 300,
      expectedResult: 300,
    }].forEach(({ description, pageXOffset, scrollLeft, expectedResult }) => {
      it(`should ${description}`, () => {
        global.pageXOffset = pageXOffset;
        Object.defineProperty(window.HTMLElement.prototype, 'scrollLeft', {
          value: scrollLeft,
          configurable: true,
        });
        expect(getOffsetLeft()).toEqual(expectedResult);
      });
    });
  });

  describe('getOffsetTop', () => {
    [{
      description: 'return window pageYOffset',
      pageYOffset: 800,
      scrollTop: 300,
      expectedResult: 800,
    }, {
      description: 'return document scrollTop if pageYOffset not defined',
      pageYOffset: undefined,
      scrollTop: 300,
      expectedResult: 300,
    }].forEach(({ description, pageYOffset, scrollTop, expectedResult }) => {
      it(`should ${description}`, () => {
        global.pageYOffset = pageYOffset;
        Object.defineProperty(window.HTMLElement.prototype, 'scrollTop', {
          value: scrollTop,
          configurable: true,
        });
        expect(getOffsetTop()).toEqual(expectedResult);
      });
    });
  });

  describe('getRoundedBoundedClientRect', () => {
    [{
      description: 'return element boundingRect',
      elementsBoundingRect: {
        top: 100,
        left: 101.5,
        bottom: 100,
        right: 100,
        width: 100,
        height: 100,
      },
      expectedResult: {
        top: 100,
        left: 102,
        bottom: 100,
        right: 100,
        width: 100,
        height: 100,
      },
    }].forEach(({ description, elementsBoundingRect, expectedResult }) => {
      it(`should ${description}`, () => {
        const element = createElement(elementsBoundingRect);
        expect(getRoundedBoundedClientRect(element)).toEqual(expectedResult);
      });
    });
  });

  describe('measure', () => {
    [{
      description: 'return undefined if not element',
      element: undefined,
      attach: false,
      expectedResult: undefined,
    }, {
      description: 'return boundingRect element',
      elementsBoundingRect: {
        top: 100,
        left: 101.5,
        bottom: 100,
        right: 100,
        width: 100,
        height: 100,
      },
      attach: false,
      expectedResult: {
        top: 100,
        left: 102,
        bottom: 100,
        right: 100,
        width: 100,
        height: 100,
      },
    }, {
      description: 'return boundingRect + computedStyle left & top if attach to a specific element',
      elementsBoundingRect: {
        top: 100,
        left: 101.5,
        bottom: 100,
        right: 100,
        width: 100,
        height: 100,
      },
      attach: 'test',
      expectedResult: {
        top: 0,
        left: 0,
        bottom: 100,
        right: 100,
        width: 100,
        height: 100,
      },
    }].forEach(({ description, elementsBoundingRect, attach, expectedResult }) => {
      it(`should ${description}`, () => {
        const element = elementsBoundingRect && createElement(elementsBoundingRect);
        expect(measure(element, attach)).toEqual(expectedResult);
      });
    });
  });
});
