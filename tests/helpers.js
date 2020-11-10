jest.useFakeTimers();

export function touch (element) {
  const createTrigger = (eventName) => (clientX, clientY) => {
    const touches = [{ clientX, clientY }];
    const event = new Event(eventName);

    event.touches = touches;
    event.changedTouches = touches;
    element.element.dispatchEvent(event);

    return touch(element);
  };

  return {
    start: createTrigger('touchstart'),
    move: createTrigger('touchmove'),
    end: createTrigger('touchend'),
  };
}

export const resizeWindow = (width = global.innerWidth, height = global.innerHeight) => {
  global.innerWidth = width;
  global.innerHeight = height;
  global.dispatchEvent(new Event('resize'));
  jest.runOnlyPendingTimers();
};

