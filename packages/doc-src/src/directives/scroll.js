import throttle from 'lodash.throttle';

function inserted (el, binding) {
  const callback = binding.value;
  const options = binding.options || { passive: true };
  const target = binding.arg ? document.querySelector(binding.arg) : window;
  if (!target) return;

  const throttledScroll = throttle(callback, 300);
  target.addEventListener('scroll', throttledScroll, true);

  /* eslint-disable no-underscore-dangle */
  el._onScroll = {
    throttledScroll,
    options,
    target,
  };
}

function unbind (el) {
  if (!el._onScroll) return;

  const { throttledScroll, options, target } = el._onScroll;

  target.removeEventListener('scroll', throttledScroll, options);
  delete el._onScroll;
}

const Scroll = {
  inserted,
  unbind,
};

export default Scroll;
