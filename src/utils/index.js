export {
  computeYearsScrollPosition,
  computePositionFromParent,
};

function computeYearsScrollPosition (container, elementToShow) {
  return elementToShow.offsetTop - (container.offsetHeight / 2) + (elementToShow.offsetHeight / 2);
}

function getOffsets (parentRect) {
  return {
    offsetBottom: window.innerHeight - parentRect.bottom,
    offsetTop: parentRect.top,
    offsetLeft: parentRect.left,
  };
}

function computePositionFromParent (element, parent, offset) {
  // -------------------------------
  // Select parent (datepicker container) to get position
  // -------------------------------
  const parentRect = parent.getBoundingClientRect();

  // -------------------------------
  // Compute offsets
  // -------------------------------
  const { offsetBottom, offsetTop, offsetLeft } = getOffsets(parentRect);

  // -------------------------------
  // Detect space around tvaPicker button
  // -------------------------------
  const elementHeight = element.offsetHeight;
  const elementWidth = element.offsetWidth;
  const isThereEnoughSpaceBelow = offsetBottom - elementHeight > 0;
  const isThereEnoughtSpaceLeft = offsetLeft - elementWidth > 0;
  const isThereEnoughSpaceAbove = offsetTop - elementHeight > 0;
  // -------------------------------
  // If there is not enought space above & below & enought space on left : placement => LEFT
  // Else placement => RIGHT
  // -------------------------------
  if (!isThereEnoughSpaceBelow && !isThereEnoughSpaceAbove) {
    const missingSpaceToShowAbove = Math.abs(offsetTop - elementHeight);
    return {
      top: (missingSpaceToShowAbove + offset) - elementHeight,
      left: isThereEnoughtSpaceLeft ? -elementWidth - offset : parentRect.width,
      origin: isThereEnoughtSpaceLeft ? 'top right' : 'bottom left',
    };
  }
  // -------------------------------
  // If there is not enought space below : placement => TOP
  // If there is not enought space above : placement => BOTTOM
  // -------------------------------
  return {
    left: (parentRect.width - elementWidth) / 2,
    top: isThereEnoughSpaceBelow ? offset : -elementHeight,
    origin: isThereEnoughSpaceBelow ? 'top center' : 'bottom center', // for animation only
  };
}
