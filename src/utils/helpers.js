export { generateRandomId, validateAttachTarget };

function generateRandomId () {
  return `_${Math.random().toString(36).substr(2, 9)}`;
}

function validateAttachTarget (value) {
  const type = typeof value;
  if (type === 'string') return true;
  return value.nodeType === Node.ELEMENT_NODE;
}
