export {
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
};

function getTopColPosition (colYs) {
  const minimumY = Math.min(...colYs);
  return {
    col: colYs.indexOf(minimumY),
    y: minimumY,
  };
}

function computeYearsScrollPosition ({ activeItem, container, min, max }) {
  if (activeItem) return activeItem.offsetTop - container.offsetHeight / 2 + activeItem.offsetHeight / 2;
  if (min || max) return 0;

  return container.scrollHeight / 2 - container.offsetHeight / 2;
}

function computeAgendaHeight (agenda, classWeeks) {
  if (classWeeks === 'has-6-weeks') {
    return agenda.offsetHeight;
  }
  return agenda.offsetHeight + 36; // height of a day's row;
}

function detectFixedActivator (activator) {
  const POSITIONS = ['fixed', 'sticky'];
  let element = activator;
  let activatorFixed = false;
  while (element) {
    if (POSITIONS.includes(window.getComputedStyle(element).position)) {
      activatorFixed = true;
      return activatorFixed;
    }
    element = element.offsetParent;
  }
  activatorFixed = false;

  return activatorFixed;
}

function getInnerWidth () {
  return window.innerWidth || document.documentElement.clientWidth;
}

function getInnerHeight () {
  return window.innerHeight || document.documentElement.clientHeight;
}

function getOffsetLeft () {
  return window.pageXOffset || document.documentElement.scrollLeft;
}

function getOffsetTop () {
  return window.pageYOffset || document.documentElement.scrollTop;
}

function getRoundedBoundedClientRect (element) {
  const rect = element.getBoundingClientRect();
  return {
    top: Math.round(rect.top),
    left: Math.round(rect.left),
    bottom: Math.round(rect.bottom),
    right: Math.round(rect.right),
    width: Math.round(rect.width),
    height: Math.round(rect.height),
  };
}

function measure (element, attach) {
  if (!element) return;

  const rect = getRoundedBoundedClientRect(element);

  // Account for activator margin
  if (attach !== false) {
    const style = window.getComputedStyle(element);
    rect.left = parseInt(style.marginLeft || 0);
    rect.top = parseInt(style.marginTop || 0);
  }
  return rect;
}
