export {
  computeYearsScrollPosition,
  getDynamicPosition,
};

function computeYearsScrollPosition (container, elementToShow) {
  return elementToShow.offsetTop - (container.offsetHeight / 2) + (elementToShow.offsetHeight / 2);
}

function getDynamicPosition (element, parent, offset) {
  // -------------------------------
  // Select parent (datepicker container) to get position
  // -------------------------------
  const parentRect = parent.getBoundingClientRect();

  // -------------------------------
  // Compute offsets
  // -------------------------------
  const { parentOffsetTop, parentOffsetLeft } = getParentOffset(parentRect);
  const { spaceBelow, spaceAbove, spaceLeft, spaceRight } = getSpacesAroundParent(parentRect);

  // -------------------------------
  // Detect space around element
  // -------------------------------
  const elementHeight = element.offsetHeight;
  const elementWidth = element.offsetWidth;
  const isThereEnoughSpaceBelow = spaceBelow - elementHeight > 0;
  const isThereEnoughtSpaceLeft = spaceLeft - elementWidth > 0;
  const isThereEnoughtSpaceRight = spaceRight - elementWidth > 0;
  const isThereEnoughSpaceAbove = spaceAbove - elementHeight > 0;

  // -------------------------------
  // If there is not enought space above, below, left & right
  // placement => MIDDLE
  // -------------------------------
  if (!isThereEnoughSpaceBelow &&
    !isThereEnoughtSpaceLeft &&
    !isThereEnoughSpaceAbove &&
    !isThereEnoughtSpaceRight) {
    return getElementCenteredPosition(elementHeight, elementWidth);
  }
  // -------------------------------
  // If there is not enought space above & below & enought space on left : placement => LEFT
  // Else placement => RIGHT
  // -------------------------------
  if (!isThereEnoughSpaceBelow && !isThereEnoughSpaceAbove) {
    const missingSpaceToShowAbove = Math.abs(spaceAbove - elementHeight);
    return {
      top: parentOffsetTop + (missingSpaceToShowAbove + parentRect.height) - elementHeight,
      left: parentOffsetLeft + (isThereEnoughtSpaceLeft ? -elementWidth - offset : parentRect.width),
      origin: isThereEnoughtSpaceLeft ? 'top right' : 'bottom left',
    };
  }
  // -------------------------------
  // If there is not enought space below : placement => TOP
  // If there is not enought space above : placement => BOTTOM
  // -------------------------------
  return {
    top: parentOffsetTop + (isThereEnoughSpaceBelow ? parentRect.height : -elementHeight),
    left: parentOffsetLeft + (parentRect.width - elementWidth) / 2,
    origin: isThereEnoughSpaceBelow ? 'top center' : 'bottom center', // for animation only
  };
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

function getElementCenteredPosition (elementHeight, elementWidth) {
  return {
    top: window.pageYOffset + (window.innerHeight - elementHeight) / 2,
    left: window.pageXOffset + (window.innerWidth - elementWidth) / 2,
    origin: 'center center', // for animation only
  };
}
