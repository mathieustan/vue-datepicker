function inserted (el, binding) {
  const callback = binding.value;
  const options = binding.options || { passive: true };
  let running = false;

  // Handle resize callback with an animation frame
  const resizeCallback = () => {
    if (running) return;
    running = true;
    window.requestAnimationFrame(callback);
    running = false;
  };

  window.addEventListener('resize', resizeCallback, options);

  Object.assign(el, {
    onResize: { resizeCallback, options, running },
  });

  // If there is no modifiers || modifiers isnt quiet => call callback on init
  if (!binding.modifiers || !binding.modifiers.quiet) {
    resizeCallback();
  }
}

function unbind (el) {
  if (!el.onResize) return;

  const { resizeCallback, options } = el.onResize;
  window.removeEventListener('resize', resizeCallback, options);
  delete el.onResize;
}

const Resize = {
  inserted,
  unbind,
};

export default Resize;
