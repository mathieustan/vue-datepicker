export {
  computeYearsScrollPosition,
  computeAgendaHeight,
  getDynamicPosition,
};

function computeYearsScrollPosition (container, elementToShow) {
  return elementToShow.offsetTop - (container.offsetHeight / 2) + (elementToShow.offsetHeight / 2);
}

function computeAgendaHeight (agenda, classWeeks) {
  if (classWeeks === 'has-6-weeks') {
    return agenda.offsetHeight;
  }
  return agenda.offsetHeight + 36; // height of a day's row;
}

function getDynamicPosition (element, activator, target) {
  // -------------------------------
  // Select activator to get position
  // -------------------------------
  const isFixedActivator = checkActivatorFixed(activator);
  const activatorRect = activator.getBoundingClientRect();
  const activatorOffsets = getActivatorOffset(activatorRect, isFixedActivator);
  const spacesAroundParent = getSpacesAroundActivator(activatorRect, target);
  // -------------------------------
  // Detect space around element
  // -------------------------------
  const placesAvailable = detectPlacesAvailable(element, spacesAroundParent);
  const {
    isThereEnoughSpaceBelow,
    isThereEnoughSpaceLeft,
    isThereEnoughSpaceRight,
    isThereEnoughSpaceAbove,
  } = placesAvailable;
  // -------------------------------
  // If there is not enought space above, below, left & right
  // placement => MIDDLE
  // -------------------------------
  if (!isThereEnoughSpaceBelow &&
    !isThereEnoughSpaceLeft &&
    !isThereEnoughSpaceAbove &&
    !isThereEnoughSpaceRight) {
    return getElementCenteredPosition(element);
  }

  return getElementPosition(
    element,
    target,
    activatorRect,
    activatorOffsets,
    spacesAroundParent,
    placesAvailable
  );
}

// -------------------------------
// HELPERS
// -------------------------------

function checkActivatorFixed (activator) {
  let element = activator;
  let activatorFixed = false;
  while (element) {
    if (window.getComputedStyle(element).position === 'fixed') {
      activatorFixed = true;
      return activatorFixed;
    }
    element = element.offsetParent;
  }
  activatorFixed = false;

  return activatorFixed;
}

function getActivatorOffset (activatorRect, isFixedActivator) {
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  return {
    activatorOffsetTop: activatorRect.top + (isFixedActivator ? 0 : scrollTop),
    activatorOffsetLeft: activatorRect.left + (isFixedActivator ? 0 : scrollLeft),
  };
}

function getSpacesAroundActivator (activatorRect, target) {
  const targetRect = target.getBoundingClientRect();
  return {
    spaceBelow: (window.innerHeight - activatorRect.bottom) - (window.innerHeight - targetRect.bottom),
    spaceAbove: activatorRect.top - target.offsetTop,
    spaceLeft: activatorRect.left - target.offsetLeft,
    spaceRight: (window.innerWidth - activatorRect.left - activatorRect.width) -
      (window.innerWidth - targetRect.left - targetRect.width),
  };
}

function detectPlacesAvailable (element, { spaceBelow, spaceAbove, spaceLeft, spaceRight }) {
  return {
    isThereEnoughSpaceBelow: (spaceBelow - element.offsetHeight) > 0,
    isThereEnoughSpaceLeft: (spaceLeft - element.offsetWidth) > 0,
    isThereEnoughSpaceRight: (spaceRight - element.offsetWidth) > 0,
    isThereEnoughSpaceAbove: (spaceAbove - element.offsetHeight) > 0,
  };
}

function getElementCenteredPosition ({ offsetHeight, offsetWidth }) {
  return {
    top: window.pageYOffset + (window.innerHeight - offsetHeight) / 2,
    left: window.pageXOffset + (window.innerWidth - offsetWidth) / 2,
    origin: 'center center', // for animation only
  };
}

function getElementPosition (
  element,
  target,
  activatorRect,
  activatorOffsets,
  spacesAroundParent,
  placesAvailable
) {
  const elementHeight = element.offsetHeight;
  const elementWidth = element.offsetWidth;
  const { activatorOffsetTop, activatorOffsetLeft } = activatorOffsets;
  const { spaceAbove } = spacesAroundParent;
  const {
    isThereEnoughSpaceBelow,
    isThereEnoughSpaceLeft,
    isThereEnoughSpaceRight,
    isThereEnoughSpaceAbove,
  } = placesAvailable;
  const missingSpaceToShowAbove = Math.abs(spaceAbove - elementHeight);
  const couldBeShowBelowOrAbove = isThereEnoughSpaceBelow || isThereEnoughSpaceAbove;

  if (!couldBeShowBelowOrAbove && isThereEnoughSpaceRight) {
    return {
      top: activatorOffsetTop + (missingSpaceToShowAbove + activatorRect.height) - elementHeight,
      left: activatorOffsetLeft + activatorRect.width,
      origin: 'left center',
    };
  }

  if (!couldBeShowBelowOrAbove && isThereEnoughSpaceLeft) {
    return {
      top: activatorOffsetTop + (missingSpaceToShowAbove + activatorRect.height) - elementHeight,
      left: activatorOffsetLeft - elementWidth,
      origin: 'right center',
    };
  }

  if (couldBeShowBelowOrAbove && isThereEnoughSpaceLeft && !isThereEnoughSpaceRight) {
    return {
      top: activatorOffsetTop + (isThereEnoughSpaceBelow ? activatorRect.height : -elementHeight),
      left: activatorOffsetLeft + activatorRect.width - elementWidth,
      origin: isThereEnoughSpaceBelow ? 'top right' : 'bottom right',
    };
  }

  if (couldBeShowBelowOrAbove && !isThereEnoughSpaceLeft && !isThereEnoughSpaceRight) {
    return {
      top: activatorOffsetTop + (isThereEnoughSpaceBelow ? activatorRect.height : -elementHeight),
      left: activatorOffsetLeft - target.offsetLeft,
      origin: isThereEnoughSpaceBelow ? 'top left' : 'bottom left',
    };
  }

  return {
    top: activatorOffsetTop + (isThereEnoughSpaceBelow ? activatorRect.height : -elementHeight),
    left: activatorOffsetLeft - target.offsetLeft,
    origin: isThereEnoughSpaceBelow ? 'top left' : 'bottom left',
  };
}
