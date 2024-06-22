/**
 * @type {import("eslint").Rule.RuleModule}
 */
const mew = {
  meta: {
    type: "problem", // 可以是 "problem", "suggestion", 或 "layout"
    docs: {
      description: "disallow usage of variable 'mew'",
      category: "Best Practices",
      recommended: false,
    },
    schema: [], // 无选项
    messages: {
      noMew: "Usage of 'mew' is not allowed.",
    },
  },
  create(context) {
    return {
      Identifier(node) {
        if (node.name === "mew") {
          context.report({
            node,
            messageId: "noMew",
          })
        }
      },
    }
  },
}

export default mew
