import { visit } from 'unist-util-visit';

export function remarkAdmonitions() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === 'containerDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'textDirective'
      ) {
        if (
          !['tip', 'warning', 'error', 'note', 'info'].includes(node.name)
        ) {
          return;
        }

        const data = node.data || (node.data = {});
        const tagName = node.type === 'textDirective' ? 'span' : 'div';

        // Add CSS classes for DaisyUI styling
        // We use 'alert' class from DaisyUI + specific color variants
        data.hName = tagName;
        data.hProperties = {
          class: `admonition admonition-${node.name}`,
          ...node.attributes,
        };
      }
    });
  };
}
