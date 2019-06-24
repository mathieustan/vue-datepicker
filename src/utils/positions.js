export {
  computeYearsScrollPosition,
  getDynamicPosition,
};

function computeYearsScrollPosition (container, elementToShow) {
  return elementToShow.offsetTop - (container.offsetHeight / 2) + (elementToShow.offsetHeight / 2);
}

function getDynamicPosition (element, parent) {
  // -------------------------------
  // Select parent (datepicker container) to get position
  // -------------------------------
  const parentRect = parent.getBoundingClientRect();
  const parentOffsets = getParentOffset(parentRect);
  const spacesAroundParent = getSpacesAroundParent(parentRect);
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
    parentRect,
    parentOffsets,
    spacesAroundParent,
    placesAvailable
  );
}

// -------------------------------
// HELPERS
// -------------------------------

function getParentOffset (parentRect) {
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    parentOffsetTop: parentRect.top + scrollTop,
    parentOffsetLeft: parentRect.left + scrollLeft,
  };
}

function getSpacesAroundParent (parentRect) {
  return {
    spaceBelow: window.innerHeight - parentRect.bottom,
    spaceAbove: parentRect.top,
    spaceLeft: parentRect.left,
    spaceRight: window.innerWidth - parentRect.left - parentRect.width,
  };
}

function detectPlacesAvailable (element, { spaceBelow, spaceAbove, spaceLeft, spaceRight }) {
  return {
    isThereEnoughSpaceBelow: spaceBelow - element.offsetHeight > 0,
    isThereEnoughtSpaceLeft: spaceLeft - element.offsetWidth > 0,
    isThereEnoughtSpaceRight: spaceRight - element.offsetWidth > 0,
    isThereEnoughSpaceAbove: spaceAbove - element.offsetHeight > 0,
  };
}

function getElementCenteredPosition ({ offsetHeight, offsetWidth }) {
  return {
    top: window.pageYOffset + (window.innerHeight - offsetHeight) / 2,
    left: window.pageXOffset + (window.innerWidth - offsetWidth) / 2,
    origin: 'center center', // for animation only
  };
}

function getElementPosition (element, parentRect, parentOffsets, spacesAroundParent, placesAvailable) {
  const elementHeight = element.offsetHeight;
  const elementWidth = element.offsetWidth;
  const { parentOffsetTop, parentOffsetLeft } = parentOffsets;
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
      top: parentOffsetTop + (missingSpaceToShowAbove + parentRect.height) - elementHeight,
      left: parentOffsetLeft + parentRect.width,
      origin: 'left center',
    };
  }

  if (!couldBeShowBelowOrAbove && isThereEnoughtSpaceLeft) {
    return {
      top: parentOffsetTop + (missingSpaceToShowAbove + parentRect.height) - elementHeight,
      left: parentOffsetLeft - elementWidth,
      origin: 'right center',
    };
  }

  if (couldBeShowBelowOrAbove && isThereEnoughtSpaceLeft && !isThereEnoughtSpaceRight) {
    return {
      top: parentOffsetTop + (isThereEnoughSpaceBelow ? parentRect.height : -elementHeight),
      left: parentOffsetLeft + parentRect.width - elementWidth,
      origin: isThereEnoughSpaceBelow ? 'top right' : 'bottom right',
    };
  }

  return {
    top: parentOffsetTop + (isThereEnoughSpaceBelow ? parentRect.height : -elementHeight),
    left: parentOffsetLeft,
    origin: isThereEnoughSpaceBelow ? 'top left' : 'bottom left',
  };
}
