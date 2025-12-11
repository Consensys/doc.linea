// scripts/remark/remark-emdash.js

export default function remarkEmdash() {
  // Recursively walk the mdast tree
  function visit(node, parent) {
    if (!node || typeof node !== "object") return;

    // If this is a text node and not inside code/inlineCode
    if (node.type === "text" && parent) {
      if (parent.type !== "code" && parent.type !== "inlineCode") {
        if (typeof node.value === "string") {
          node.value = node.value.replace(/--/g, "—");
        }
      }
    }

    // Recurse into children if present
    if (Array.isArray(node.children)) {
      for (const child of node.children) {
        visit(child, node);
      }
    }
  }

  return (tree) => {
    visit(tree, null);
  };
}
