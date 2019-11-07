function isCssColor (color) {
  return Boolean(color) && Boolean(color.match(/^(#|(rgb|hsl)a?\()/));
}

const colorable = {
  props: {
    color: { type: String },
  },
  methods: {
    setBackgroundColor (color, data) {
      if (!isCssColor(color)) return data;

      if (data) {
        return {
          ...data,
          style: {
            ...data.style,
            'background-color': `${color}`,
            'border-color': `${color}`,
          },
        };
      }

      return {
        'background-color': `${color}`,
        'border-color': `${color}`,
      };
    },
    setTextColor (color, data) {
      if (!isCssColor(color)) return data;

      if (data) {
        return {
          ...data,
          style: {
            ...data.style,
            color: `${color}`,
          },
        };
      }

      return {
        'color': `${color}`,
      };
    },
  },
};

export default colorable;
