function isCssColor (color) {
  return Boolean(color) && Boolean(color.match(/^(#|(rgb|hsl)a?\()/));
}

const colorable = {
  props: {
    color: { type: String },
  },
  methods: {
    setBackgroundColor (color) {
      if (!isCssColor(color)) return;
      return {
        'background-color': `${color}`,
        'border-color': `${color}`,
      };
    },
    setTextColor (color) {
      if (!isCssColor(color)) return;
      return {
        'color': `${color}`,
      };
    },
  },
};

export default colorable;
