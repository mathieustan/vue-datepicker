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
    isThereEnoughtSpaceLeft,
    isThereEnoughtSpaceRight,
    isThereEnoughSpaceAbove,
  } = placesAvailable;
  // -------------------------------
  // If there is not enought space above, below, left & right
  // placement => MIDDLE
  // -------------------------------
  if (!isThereEnoughSpaceBelow &&
    !isThereEnoughtSpaceLeft &&
    !isThereEnoughSpaceAbove &&
    !isThereEnoughtSpaceRight) {
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
  let activatorFixed;
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
    isThereEnoughtSpaceLeft: (spaceLeft - element.offsetWidth) > 0,
    isThereEnoughtSpaceRight: (spaceRight - element.offsetWidth) > 0,
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
    isThereEnoughtSpaceLeft,
    isThereEnoughtSpaceRight,
    isThereEnoughSpaceAbove,
  } = placesAvailable;
  const missingSpaceToShowAbove = Math.abs(spaceAbove - elementHeight);
  const couldBeShowBelowOrAbove = isThereEnoughSpaceBelow || isThereEnoughSpaceAbove;

  if (!couldBeShowBelowOrAbove && isThereEnoughtSpaceRight) {
    return {
      top: activatorOffsetTop + (missingSpaceToShowAbove + activatorRect.height) - elementHeight,
      left: activatorOffsetLeft + activatorRect.width,
      origin: 'left center',
    };
  }

  if (!couldBeShowBelowOrAbove && isThereEnoughtSpaceLeft) {
    return {
      top: activatorOffsetTop + (missingSpaceToShowAbove + activatorRect.height) - elementHeight,
      left: activatorOffsetLeft - elementWidth,
      origin: 'right center',
    };
  }

  if (couldBeShowBelowOrAbove && isThereEnoughtSpaceLeft && !isThereEnoughtSpaceRight) {
    return {
      top: activatorOffsetTop + (isThereEnoughSpaceBelow ? activatorRect.height : -elementHeight),
      left: activatorOffsetLeft + activatorRect.width - elementWidth,
      origin: isThereEnoughSpaceBelow ? 'top right' : 'bottom right',
    };
  }

  if (couldBeShowBelowOrAbove && !isThereEnoughtSpaceLeft && !isThereEnoughtSpaceRight) {
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
