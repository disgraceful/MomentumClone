export default {
  methods: {
    findDOMElement(element, tag, up = false) {
      let el = up ? element.parentElement : element.firstElementChild;
      if (!el) return null;

      if (el.tagName.toLowerCase() === tag) {
        return el;
      } else {
        return this.findDOMElement(el, tag, up);
      }
    },
  },
};
