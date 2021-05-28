import assign from 'lodash/assign';
import compact from 'lodash/compact';

import Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-scss';

export default {
  functional: true,
  props: {
    code: { type: String },
    language: { type: String, default: 'markup' },
  },
  render (h, { data, props, children }) {
    const code = props.code || (children ? children[0].text : '');
    const language = props.language;
    const className = `language-${language}`;
    const dataPre = assign({}, data, { class: compact([data.class, className]) });

    assign(Prism.languages.html, { 'highlight': /\*\*(.*?)\*\*/g });

    const prismLanguage = Prism.languages[language];

    if (process.env.NODE_ENV === 'development' && !prismLanguage) {
      throw new Error(
        `Prism component for language "${language}" was not found, did you forget to register it?
        See all available ones: https://cdn.jsdelivr.net/npm/prismjs/components/`,
      );
    }

    const prismHighlight = Prism.highlight(code, prismLanguage, language);

    const highlighted = language === 'html' ?
      prismHighlight.replace(
        /\*\*(.*?)\*\*/g,
        (_, text) => `<span class="token highlight background-success background-opacity-25">${text}</span>`,
      ) : prismHighlight;

    const codeElement = h('code', {
      class: className,
      domProps: {
        innerHTML: highlighted,
      },
    });

    return h('pre', dataPre, [codeElement]);
  },
};
