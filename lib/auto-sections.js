export default function plugin() {
  return function transform({ children }) {
    let curr = 0;

    while (curr < children.length) {
      let end = curr + 1;

      // seek next heading or end of document
      for (; end < children.length; end++) {
        if (children[end].type === "heading") {
          break;
        }
      }

      // create new section
      const sectionChildren = children.slice(curr, end);
      const section = {
        type: "section",
        depth: children[curr].depth,
        children: sectionChildren,
        data: {
          hName: "section"
        }
      };

      // splice section into tree and continue on next node
      children.splice(curr, sectionChildren.length, section);
      curr++;
    }
  };
}
