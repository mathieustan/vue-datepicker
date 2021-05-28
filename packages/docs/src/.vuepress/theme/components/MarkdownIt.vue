<script>
import MarkdownIt from 'markdown-it';

export default {
  name: 'MarkdownIt',
  functional: true,
  render (h, context) {
    if (context.children.length > 1) {
      console.error('You should have only 1 slot inside <MarkdownIt>');
      return;
    }

    const stringToRender = context.children[0]?.text;
    const md = new MarkdownIt();
    const innerHTML = md.render(stringToRender);

    return h('p', {
      domProps: {
        innerHTML,
      },
    });
  },
};
</script>
