import { r as reactExports, U as UserRole, j as jsxRuntimeExports, P as PageLoader, A as Avatar, E as AvatarImage, G as AvatarFallback, B as Button, f as ue } from "./index-Dg45A33R.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle, d as CardDescription } from "./card-Chn20a5B.js";
import { I as Input } from "./input-BhHiXbVE.js";
import { L as Label } from "./label-CU1-HzrB.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-7hNJ6M96.js";
import { m as useMyProfile, n as useSaveProfile } from "./use-backend-LwZ60sw8.js";
import "./chevron-up-DFtPZkDc.js";
const ROLE_LABELS = {
  [UserRole.buyer]: "Buyer — I buy items",
  [UserRole.seller]: "Seller — I sell items",
  [UserRole.both]: "Both — I buy and sell"
};
function ProfilePage() {
  const { data: profile, isLoading } = useMyProfile();
  const saveProfile = useSaveProfile();
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [displayPictureUrl, setDisplayPictureUrl] = reactExports.useState("");
  const [role, setRole] = reactExports.useState(UserRole.buyer);
  reactExports.useEffect(() => {
    if (profile) {
      setName(profile.name ?? "");
      setEmail(profile.email ?? "");
      setDisplayPictureUrl(profile.displayPictureUrl ?? "");
      setRole(profile.role ?? UserRole.buyer);
    }
  }, [profile]);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await saveProfile.mutateAsync({ name, email, displayPictureUrl, role });
      ue.success("Profile saved successfully!");
    } catch {
      ue.error("Failed to save profile. Please try again.");
    }
  }
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoader, { message: "Loading profile…" });
  const initials = name ? name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) : "?";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8 max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl text-foreground", children: "My Profile" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Manage your account information and preferences" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border shadow-card mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 flex items-center gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "w-16 h-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: displayPictureUrl }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-primary text-primary-foreground font-bold text-xl", children: initials })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground", children: name || "Anonymous User" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: email || "No email set" }),
        profile && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xs text-muted-foreground mt-1", children: [
          profile.id.toText().slice(0, 24),
          "…"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: "Profile details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Update your display name, email, and role." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: handleSubmit,
          className: "space-y-5",
          "data-ocid": "profile.form",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "profile-name", children: "Display name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "profile-name",
                  placeholder: "Your name",
                  value: name,
                  onChange: (e) => setName(e.target.value),
                  "data-ocid": "profile.name.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "profile-email", children: "Email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "profile-email",
                  type: "email",
                  placeholder: "you@example.com",
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  "data-ocid": "profile.email.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "profile-avatar", children: "Profile picture URL" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "profile-avatar",
                  type: "url",
                  placeholder: "https://example.com/avatar.jpg",
                  value: displayPictureUrl,
                  onChange: (e) => setDisplayPictureUrl(e.target.value),
                  "data-ocid": "profile.avatar.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Account role" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: role,
                  onValueChange: (v) => setRole(v),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "profile.role.select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.entries(ROLE_LABELS).map(([val, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: val, children: label }, val)) })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                disabled: saveProfile.isPending,
                "data-ocid": "profile.save.submit_button",
                className: "w-full sm:w-auto",
                children: saveProfile.isPending ? "Saving…" : "Save profile"
              }
            )
          ]
        }
      ) })
    ] })
  ] });
}
export {
  ProfilePage as default
};
