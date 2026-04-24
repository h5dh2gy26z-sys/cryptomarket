import { u as useNavigate, r as reactExports, C as Category, j as jsxRuntimeExports, B as Button, g as CirclePlus, f as ue } from "./index-Dg45A33R.js";
import { C as Card, b as CardHeader, c as CardTitle, d as CardDescription, a as CardContent } from "./card-Chn20a5B.js";
import { I as Input } from "./input-BhHiXbVE.js";
import { L as Label } from "./label-CU1-HzrB.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-7hNJ6M96.js";
import { T as Textarea } from "./textarea-Dkp7kinP.js";
import { e as useCreateListing } from "./use-backend-LwZ60sw8.js";
import "./chevron-up-DFtPZkDc.js";
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
function SellPage() {
  const navigate = useNavigate();
  const createListing = useCreateListing();
  const [title, setTitle] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [priceUsd, setPriceUsd] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState(Category.other);
  const [coverImageUrl, setCoverImageUrl] = reactExports.useState("");
  const [errors, setErrors] = reactExports.useState({});
  function validate() {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!priceUsd || Number.isNaN(Number(priceUsd)) || Number(priceUsd) <= 0) {
      newErrors.priceUsd = "Enter a valid price greater than 0";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    try {
      const listing = await createListing.mutateAsync({
        title: title.trim(),
        description: description.trim(),
        priceUsd: Number(priceUsd),
        category,
        coverImageUrl: coverImageUrl.trim()
      });
      ue.success("Listing created successfully!");
      navigate({ to: "/listings/$id", params: { id: listing.id.toString() } });
    } catch {
      ue.error("Failed to create listing. Please try again.");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8 max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl text-foreground", children: "Create a listing" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "List your product or service and accept crypto payments globally." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-card border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: "Listing details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Fill in the details about what you're selling. Buyers pay in cryptocurrency, and you receive USD via Stripe Connect." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: handleSubmit,
          className: "space-y-5",
          "data-ocid": "sell.form",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "title", children: "Title *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "title",
                  placeholder: "What are you selling?",
                  value: title,
                  onChange: (e) => setTitle(e.target.value),
                  "data-ocid": "sell.title.input",
                  "aria-invalid": !!errors.title
                }
              ),
              errors.title && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs text-destructive",
                  "data-ocid": "sell.title.field_error",
                  children: errors.title
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "description", children: "Description *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "description",
                  placeholder: "Describe your item in detail…",
                  value: description,
                  onChange: (e) => setDescription(e.target.value),
                  rows: 4,
                  "data-ocid": "sell.description.textarea",
                  "aria-invalid": !!errors.description
                }
              ),
              errors.description && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs text-destructive",
                  "data-ocid": "sell.description.field_error",
                  children: errors.description
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "price", children: "Price (USD) *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm", children: "$" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "price",
                      type: "number",
                      step: "0.01",
                      min: "0.01",
                      placeholder: "0.00",
                      value: priceUsd,
                      onChange: (e) => setPriceUsd(e.target.value),
                      className: "pl-7",
                      "data-ocid": "sell.price.input",
                      "aria-invalid": !!errors.priceUsd
                    }
                  )
                ] }),
                errors.priceUsd && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs text-destructive",
                    "data-ocid": "sell.price.field_error",
                    children: errors.priceUsd
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "category", children: "Category" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: category,
                    onValueChange: (v) => setCategory(v),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "category", "data-ocid": "sell.category.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.entries(CATEGORY_LABELS).map(([val, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: val, children: label }, val)) })
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "coverImage", children: "Cover image URL" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "coverImage",
                  type: "url",
                  placeholder: "https://example.com/image.jpg",
                  value: coverImageUrl,
                  onChange: (e) => setCoverImageUrl(e.target.value),
                  "data-ocid": "sell.cover_image.input"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Paste a public image URL for your listing cover photo." })
            ] }),
            priceUsd && Number(priceUsd) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/30 border border-border p-3 space-y-1.5 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Sale price" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
                  "$",
                  Number(priceUsd).toFixed(2)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Platform fee (2.5%)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
                  "−$",
                  (Number(priceUsd) * 0.025).toFixed(2)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-semibold text-accent border-t border-border pt-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "You receive" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
                  "$",
                  (Number(priceUsd) * 0.975).toFixed(2)
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                className: "w-full",
                size: "lg",
                disabled: createListing.isPending,
                "data-ocid": "sell.submit_button",
                children: createListing.isPending ? "Creating listing…" : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-4 h-4 mr-2" }),
                  "Create listing"
                ] })
              }
            )
          ]
        }
      ) })
    ] })
  ] });
}
export {
  SellPage as default
};
