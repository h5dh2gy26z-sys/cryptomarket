import { c as createLucideIcon, j as jsxRuntimeExports, d as Badge } from "./index-Dg45A33R.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode);
const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    className: "bg-primary/10 text-primary border-primary/20 font-medium"
  },
  paid: {
    label: "Paid",
    className: "bg-accent/10 text-accent border-accent/30 font-medium"
  },
  failed: {
    label: "Failed",
    className: "bg-destructive/10 text-destructive border-destructive/20 font-medium"
  },
  refunded: {
    label: "Refunded",
    className: "bg-muted text-muted-foreground border-border font-medium"
  }
};
function StatusBadge({ status, className = "" }) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Badge,
    {
      variant: "outline",
      className: `text-xs ${config.className} ${className}`,
      "data-ocid": `status.${status}.badge`,
      children: config.label
    }
  );
}
export {
  Clock as C,
  RefreshCw as R,
  StatusBadge as S
};
