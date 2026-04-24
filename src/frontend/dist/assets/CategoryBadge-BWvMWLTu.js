import { c as createLucideIcon, C as Category, j as jsxRuntimeExports, d as Badge } from "./index-Dg45A33R.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode);
const CATEGORY_CONFIG = {
  [Category.electronics]: {
    label: "Electronics",
    className: "bg-primary/10 text-primary border-primary/20"
  },
  [Category.clothing]: {
    label: "Clothing",
    className: "bg-secondary/30 text-secondary-foreground border-secondary/30"
  },
  [Category.books]: {
    label: "Books",
    className: "bg-chart-5/10 text-chart-5 border-chart-5/20"
  },
  [Category.home]: {
    label: "Home",
    className: "bg-accent/10 text-accent border-accent/20"
  },
  [Category.sports]: {
    label: "Sports",
    className: "bg-chart-2/10 text-chart-2 border-chart-2/20"
  },
  [Category.digital]: {
    label: "Digital",
    className: "bg-chart-3/10 text-chart-3 border-chart-3/20"
  },
  [Category.services]: {
    label: "Services",
    className: "bg-chart-4/10 text-chart-4 border-chart-4/20"
  },
  [Category.other]: {
    label: "Other",
    className: "bg-muted text-muted-foreground border-border"
  }
};
function CategoryBadge({
  category,
  className = "",
  onClick
}) {
  const config = CATEGORY_CONFIG[category] ?? CATEGORY_CONFIG[Category.other];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Badge,
    {
      variant: "outline",
      className: `text-xs font-medium ${config.className} ${className} ${onClick ? "cursor-pointer hover:opacity-80" : ""}`,
      onClick,
      "data-ocid": `category.${category}.badge`,
      children: config.label
    }
  );
}
function CategoryFilter({ selected, onChange }) {
  const categories = Object.values(Category);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "flex flex-wrap gap-2 border-0 p-0 m-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "sr-only", children: "Filter by category" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => onChange(void 0),
        "data-ocid": "category.all.tab",
        className: `px-3 py-1.5 rounded-full text-xs font-medium border transition-fast ${!selected ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"}`,
        children: "All"
      }
    ),
    categories.map((cat) => {
      const config = CATEGORY_CONFIG[cat];
      const isSelected = selected === cat;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => onChange(isSelected ? void 0 : cat),
          "data-ocid": `category.${cat}.tab`,
          className: `px-3 py-1.5 rounded-full text-xs font-medium border transition-fast ${isSelected ? `${config.className} border-current` : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"}`,
          children: config.label
        },
        cat
      );
    })
  ] });
}
export {
  CategoryFilter as C,
  Tag as T,
  CategoryBadge as a
};
