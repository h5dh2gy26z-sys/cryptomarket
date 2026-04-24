import { c as createLucideIcon, r as reactExports, i as useControllableState, j as jsxRuntimeExports, k as useId, l as Presence, m as Primitive, n as composeEventHandlers, o as Portal$1, p as useComposedRefs, q as hideOthers, s as createContextScope, R as ReactRemoveScroll, t as useFocusGuards, F as FocusScope, D as DismissableLayer, v as createSlot, w as createContext2, X, x as cn, C as Category, L as Link, B as Button, d as Badge, f as ue } from "./index-Dg45A33R.js";
import { C as Card, a as CardContent } from "./card-Chn20a5B.js";
import { I as Input } from "./input-BhHiXbVE.js";
import { L as Label } from "./label-CU1-HzrB.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-7hNJ6M96.js";
import { T as Textarea } from "./textarea-Dkp7kinP.js";
import { T as Tag, a as CategoryBadge } from "./CategoryBadge-BWvMWLTu.js";
import { L as ListingCardSkeleton } from "./ListingCard-B36K81hD.js";
import { h as useMyListings, j as useDeleteListing, k as useUpdateListing } from "./use-backend-LwZ60sw8.js";
import { P as Package } from "./package-B3MpjVjh.js";
import "./chevron-up-DFtPZkDc.js";
import "./skeleton-Ca2vIRxf.js";
import "./arrow-right-Bl54Df8w.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const Pen = createLucideIcon("pen", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
var DIALOG_NAME = "Dialog";
var [createDialogContext] = createContextScope(DIALOG_NAME);
var [DialogProvider, useDialogContext] = createDialogContext(DIALOG_NAME);
var Dialog$1 = (props) => {
  const {
    __scopeDialog,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    modal = true
  } = props;
  const triggerRef = reactExports.useRef(null);
  const contentRef = reactExports.useRef(null);
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
    caller: DIALOG_NAME
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DialogProvider,
    {
      scope: __scopeDialog,
      triggerRef,
      contentRef,
      contentId: useId(),
      titleId: useId(),
      descriptionId: useId(),
      open,
      onOpenChange: setOpen,
      onOpenToggle: reactExports.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
      modal,
      children
    }
  );
};
Dialog$1.displayName = DIALOG_NAME;
var TRIGGER_NAME = "DialogTrigger";
var DialogTrigger = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...triggerProps } = props;
    const context = useDialogContext(TRIGGER_NAME, __scopeDialog);
    const composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": context.open,
        "aria-controls": context.contentId,
        "data-state": getState(context.open),
        ...triggerProps,
        ref: composedTriggerRef,
        onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
      }
    );
  }
);
DialogTrigger.displayName = TRIGGER_NAME;
var PORTAL_NAME = "DialogPortal";
var [PortalProvider, usePortalContext] = createDialogContext(PORTAL_NAME, {
  forceMount: void 0
});
var DialogPortal$1 = (props) => {
  const { __scopeDialog, forceMount, children, container } = props;
  const context = useDialogContext(PORTAL_NAME, __scopeDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PortalProvider, { scope: __scopeDialog, forceMount, children: reactExports.Children.map(children, (child) => /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Portal$1, { asChild: true, container, children: child }) })) });
};
DialogPortal$1.displayName = PORTAL_NAME;
var OVERLAY_NAME = "DialogOverlay";
var DialogOverlay$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(OVERLAY_NAME, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...overlayProps } = props;
    const context = useDialogContext(OVERLAY_NAME, props.__scopeDialog);
    return context.modal ? /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlayImpl, { ...overlayProps, ref: forwardedRef }) }) : null;
  }
);
DialogOverlay$1.displayName = OVERLAY_NAME;
var Slot = createSlot("DialogOverlay.RemoveScroll");
var DialogOverlayImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...overlayProps } = props;
    const context = useDialogContext(OVERLAY_NAME, __scopeDialog);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ jsxRuntimeExports.jsx(ReactRemoveScroll, { as: Slot, allowPinchZoom: true, shards: [context.contentRef], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          "data-state": getState(context.open),
          ...overlayProps,
          ref: forwardedRef,
          style: { pointerEvents: "auto", ...overlayProps.style }
        }
      ) })
    );
  }
);
var CONTENT_NAME = "DialogContent";
var DialogContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(CONTENT_NAME, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...contentProps } = props;
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: context.modal ? /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContentModal, { ...contentProps, ref: forwardedRef }) : /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContentNonModal, { ...contentProps, ref: forwardedRef }) });
  }
);
DialogContent$1.displayName = CONTENT_NAME;
var DialogContentModal = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, context.contentRef, contentRef);
    reactExports.useEffect(() => {
      const content = contentRef.current;
      if (content) return hideOthers(content);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      DialogContentImpl,
      {
        ...props,
        ref: composedRefs,
        trapFocus: context.open,
        disableOutsidePointerEvents: true,
        onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
          var _a;
          event.preventDefault();
          (_a = context.triggerRef.current) == null ? void 0 : _a.focus();
        }),
        onPointerDownOutside: composeEventHandlers(props.onPointerDownOutside, (event) => {
          const originalEvent = event.detail.originalEvent;
          const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
          const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
          if (isRightClick) event.preventDefault();
        }),
        onFocusOutside: composeEventHandlers(
          props.onFocusOutside,
          (event) => event.preventDefault()
        )
      }
    );
  }
);
var DialogContentNonModal = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    const hasInteractedOutsideRef = reactExports.useRef(false);
    const hasPointerDownOutsideRef = reactExports.useRef(false);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      DialogContentImpl,
      {
        ...props,
        ref: forwardedRef,
        trapFocus: false,
        disableOutsidePointerEvents: false,
        onCloseAutoFocus: (event) => {
          var _a, _b;
          (_a = props.onCloseAutoFocus) == null ? void 0 : _a.call(props, event);
          if (!event.defaultPrevented) {
            if (!hasInteractedOutsideRef.current) (_b = context.triggerRef.current) == null ? void 0 : _b.focus();
            event.preventDefault();
          }
          hasInteractedOutsideRef.current = false;
          hasPointerDownOutsideRef.current = false;
        },
        onInteractOutside: (event) => {
          var _a, _b;
          (_a = props.onInteractOutside) == null ? void 0 : _a.call(props, event);
          if (!event.defaultPrevented) {
            hasInteractedOutsideRef.current = true;
            if (event.detail.originalEvent.type === "pointerdown") {
              hasPointerDownOutsideRef.current = true;
            }
          }
          const target = event.target;
          const targetIsTrigger = (_b = context.triggerRef.current) == null ? void 0 : _b.contains(target);
          if (targetIsTrigger) event.preventDefault();
          if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.current) {
            event.preventDefault();
          }
        }
      }
    );
  }
);
var DialogContentImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, trapFocus, onOpenAutoFocus, onCloseAutoFocus, ...contentProps } = props;
    const context = useDialogContext(CONTENT_NAME, __scopeDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    useFocusGuards();
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FocusScope,
        {
          asChild: true,
          loop: true,
          trapped: trapFocus,
          onMountAutoFocus: onOpenAutoFocus,
          onUnmountAutoFocus: onCloseAutoFocus,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            DismissableLayer,
            {
              role: "dialog",
              id: context.contentId,
              "aria-describedby": context.descriptionId,
              "aria-labelledby": context.titleId,
              "data-state": getState(context.open),
              ...contentProps,
              ref: composedRefs,
              onDismiss: () => context.onOpenChange(false)
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TitleWarning, { titleId: context.titleId }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionWarning, { contentRef, descriptionId: context.descriptionId })
      ] })
    ] });
  }
);
var TITLE_NAME = "DialogTitle";
var DialogTitle$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...titleProps } = props;
    const context = useDialogContext(TITLE_NAME, __scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.h2, { id: context.titleId, ...titleProps, ref: forwardedRef });
  }
);
DialogTitle$1.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "DialogDescription";
var DialogDescription$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...descriptionProps } = props;
    const context = useDialogContext(DESCRIPTION_NAME, __scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.p, { id: context.descriptionId, ...descriptionProps, ref: forwardedRef });
  }
);
DialogDescription$1.displayName = DESCRIPTION_NAME;
var CLOSE_NAME = "DialogClose";
var DialogClose = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...closeProps } = props;
    const context = useDialogContext(CLOSE_NAME, __scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        ...closeProps,
        ref: forwardedRef,
        onClick: composeEventHandlers(props.onClick, () => context.onOpenChange(false))
      }
    );
  }
);
DialogClose.displayName = CLOSE_NAME;
function getState(open) {
  return open ? "open" : "closed";
}
var TITLE_WARNING_NAME = "DialogTitleWarning";
var [WarningProvider, useWarningContext] = createContext2(TITLE_WARNING_NAME, {
  contentName: CONTENT_NAME,
  titleName: TITLE_NAME,
  docsSlug: "dialog"
});
var TitleWarning = ({ titleId }) => {
  const titleWarningContext = useWarningContext(TITLE_WARNING_NAME);
  const MESSAGE = `\`${titleWarningContext.contentName}\` requires a \`${titleWarningContext.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${titleWarningContext.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${titleWarningContext.docsSlug}`;
  reactExports.useEffect(() => {
    if (titleId) {
      const hasTitle = document.getElementById(titleId);
      if (!hasTitle) console.error(MESSAGE);
    }
  }, [MESSAGE, titleId]);
  return null;
};
var DESCRIPTION_WARNING_NAME = "DialogDescriptionWarning";
var DescriptionWarning = ({ contentRef, descriptionId }) => {
  const descriptionWarningContext = useWarningContext(DESCRIPTION_WARNING_NAME);
  const MESSAGE = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${descriptionWarningContext.contentName}}.`;
  reactExports.useEffect(() => {
    var _a;
    const describedById = (_a = contentRef.current) == null ? void 0 : _a.getAttribute("aria-describedby");
    if (descriptionId && describedById) {
      const hasDescription = document.getElementById(descriptionId);
      if (!hasDescription) console.warn(MESSAGE);
    }
  }, [MESSAGE, contentRef, descriptionId]);
  return null;
};
var Root = Dialog$1;
var Portal = DialogPortal$1;
var Overlay = DialogOverlay$1;
var Content = DialogContent$1;
var Title = DialogTitle$1;
var Description = DialogDescription$1;
var Close = DialogClose;
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogFooter({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
function DialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Description,
    {
      "data-slot": "dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
const SKELETON_KEYS = ["l1", "l2", "l3"];
const CATEGORY_LABELS = {
  [Category.electronics]: "Electronics",
  [Category.clothing]: "Clothing",
  [Category.books]: "Books",
  [Category.home]: "Home",
  [Category.sports]: "Sports",
  [Category.digital]: "Digital",
  [Category.services]: "Services",
  [Category.other]: "Other"
};
function SellerListingsPage() {
  const { data: listings, isLoading } = useMyListings();
  const deleteListing = useDeleteListing();
  const updateListing = useUpdateListing();
  const [editTarget, setEditTarget] = reactExports.useState(null);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const [editTitle, setEditTitle] = reactExports.useState("");
  const [editDesc, setEditDesc] = reactExports.useState("");
  const [editPrice, setEditPrice] = reactExports.useState("");
  const [editCategory, setEditCategory] = reactExports.useState(Category.other);
  const [editImageUrl, setEditImageUrl] = reactExports.useState("");
  function openEdit(listing) {
    setEditTarget(listing);
    setEditTitle(listing.title);
    setEditDesc(listing.description);
    setEditPrice(listing.priceUsd.toString());
    setEditCategory(listing.category);
    setEditImageUrl(listing.coverImageUrl);
  }
  async function handleUpdate(e) {
    e.preventDefault();
    if (!editTarget) return;
    try {
      await updateListing.mutateAsync({
        id: editTarget.id,
        input: {
          title: editTitle.trim(),
          description: editDesc.trim(),
          priceUsd: Number(editPrice),
          category: editCategory,
          coverImageUrl: editImageUrl.trim()
        }
      });
      ue.success("Listing updated!");
      setEditTarget(null);
    } catch {
      ue.error("Failed to update listing.");
    }
  }
  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      await deleteListing.mutateAsync(deleteTarget.id);
      ue.success("Listing deleted.");
      setDeleteTarget(null);
    } catch {
      ue.error("Failed to delete listing.");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl text-foreground", children: "My Listings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: listings ? `${listings.length} listing${listings.length !== 1 ? "s" : ""}` : "Manage your listings" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/sell", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { "data-ocid": "seller_listings.create.primary_button", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
        "New listing"
      ] }) })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: SKELETON_KEYS.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(ListingCardSkeleton, {}, k)) }) : !listings || listings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "py-20 text-center border border-dashed border-border rounded-xl",
        "data-ocid": "seller_listings.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-12 h-12 mx-auto mb-4 text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-lg text-foreground", children: "No listings yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1 mb-6", children: "Create your first listing to start selling." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/sell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "data-ocid": "seller_listings.create_first.button", children: "Create a listing" }) })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "seller_listings.list", children: listings.map((listing, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "border-border shadow-xs hover:shadow-card transition-smooth",
        "data-ocid": `seller_listings.item.${i + 1}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0", children: listing.coverImageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: listing.coverImageUrl,
              alt: listing.title,
              className: "w-full h-full object-cover"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-6 h-6 text-muted-foreground/40" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-foreground truncate", children: listing.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryBadge, { category: listing.category }),
              !listing.isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: "Inactive" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 line-clamp-1", children: listing.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-sm text-foreground mt-1", children: [
              "$",
              listing.priceUsd.toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "icon",
                onClick: () => openEdit(listing),
                "data-ocid": `seller_listings.edit_button.${i + 1}`,
                "aria-label": `Edit ${listing.title}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "icon",
                className: "text-destructive hover:text-destructive",
                onClick: () => setDeleteTarget(listing),
                "data-ocid": `seller_listings.delete_button.${i + 1}`,
                "aria-label": `Delete ${listing.title}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
              }
            )
          ] })
        ] })
      },
      listing.id.toString()
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!editTarget,
        onOpenChange: (o) => !o && setEditTarget(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            className: "max-w-lg",
            "data-ocid": "seller_listings.edit.dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Edit listing" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Update the details for your listing." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleUpdate, className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-title", children: "Title" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "edit-title",
                      value: editTitle,
                      onChange: (e) => setEditTitle(e.target.value),
                      "data-ocid": "seller_listings.edit_title.input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-desc", children: "Description" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      id: "edit-desc",
                      value: editDesc,
                      onChange: (e) => setEditDesc(e.target.value),
                      rows: 3,
                      "data-ocid": "seller_listings.edit_description.textarea"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-price", children: "Price (USD)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "edit-price",
                        type: "number",
                        step: "0.01",
                        value: editPrice,
                        onChange: (e) => setEditPrice(e.target.value),
                        "data-ocid": "seller_listings.edit_price.input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Category" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Select,
                      {
                        value: editCategory,
                        onValueChange: (v) => setEditCategory(v),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "seller_listings.edit_category.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.entries(CATEGORY_LABELS).map(([val, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: val, children: label }, val)) })
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-image", children: "Cover image URL" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "edit-image",
                      type: "url",
                      value: editImageUrl,
                      onChange: (e) => setEditImageUrl(e.target.value),
                      "data-ocid": "seller_listings.edit_image.input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      onClick: () => setEditTarget(null),
                      "data-ocid": "seller_listings.edit.cancel_button",
                      children: "Cancel"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "submit",
                      disabled: updateListing.isPending,
                      "data-ocid": "seller_listings.edit.save_button",
                      children: updateListing.isPending ? "Saving…" : "Save changes"
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!deleteTarget,
        onOpenChange: (o) => !o && setDeleteTarget(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "seller_listings.delete.dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Delete listing" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
              'Are you sure you want to delete "',
              deleteTarget == null ? void 0 : deleteTarget.title,
              '"? This cannot be undone.'
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: () => setDeleteTarget(null),
                "data-ocid": "seller_listings.delete.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "destructive",
                onClick: handleDelete,
                disabled: deleteListing.isPending,
                "data-ocid": "seller_listings.delete.confirm_button",
                children: deleteListing.isPending ? "Deleting…" : "Delete"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  SellerListingsPage as default
};
