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
