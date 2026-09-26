/* @ds-bundle: Proti design system — all 19 components in one global script.
   For throwaway HTML prototypes only (per SKILL.md). Load React + ReactDOM
   (global UMD builds) and styles.css before this file, then read components
   off `window.ProtiDesignSystem`. Production code should import from
   src/design-system/ in this repository instead. */

(() => {

const __ds_ns = (window.ProtiDesignSystem = window.ProtiDesignSystem || {});
const __ds_scope = {};
(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Icon.jsx
try { (() => {
const BASE = "https://unpkg.com/lucide-static@0.462.0/icons/";
function Icon({ name = "utensils", size = 20, color = "currentColor", style, ...rest }) {
  const url = BASE + name + ".svg";
  return React.createElement("span", Object.assign({ "aria-hidden": "true" }, rest, {
    style: {
      display: "inline-block", width: size, height: size, flex: "0 0 auto",
      backgroundColor: color,
      WebkitMaskImage: `url(${url})`, maskImage: `url(${url})`,
      WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat",
      WebkitMaskSize: "contain", maskSize: "contain",
      WebkitMaskPosition: "center", maskPosition: "center",
      ...style,
    },
  }));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
const TONES = {
  default: { background: "var(--surface-card)", border: "1px solid var(--border-subtle)" },
  sunken: { background: "var(--surface-sunken)", border: "1px solid transparent" },
  accent: { background: "var(--mint-100)", border: "1px solid var(--mint-200)" },
  sand: { background: "var(--sand-100)", border: "1px solid var(--sand-200)" },
  leaf: { background: "var(--leaf-200)", border: "1px solid var(--leaf-300)" },
  inverse: { background: "var(--ink-0)", border: "1px solid var(--ink-1)" },
};
const PADS = { none: 0, s: "var(--space-4)", m: "var(--space-6)", l: "var(--space-8)" };
function Card({ tone = "default", padding = "m", elevation = "s", interactive = false, children, style, ...rest }) {
  const t = TONES[tone] || TONES.default;
  const [hover, setHover] = React.useState(false);
  return React.createElement("div", Object.assign({
    onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false),
  }, rest, {
    style: {
      background: t.background, border: t.border,
      color: tone === "inverse" ? "var(--text-inverse)" : "var(--text-body)",
      borderRadius: "var(--radius-card)", padding: PADS[padding],
      boxShadow: `var(--shadow-${interactive && hover ? "m" : elevation})`,
      transform: interactive && hover ? "translateY(var(--hover-lift))" : "none",
      cursor: interactive ? "pointer" : undefined,
      transition: "box-shadow var(--duration-base) var(--ease-standard), transform var(--duration-base) var(--ease-standard)",
      ...style,
    },
  }), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
const TONES = {
  neutral: { background: "var(--cream-2)", color: "var(--ink-1)" },
  mint: { background: "var(--mint-200)", color: "var(--ink-0)" },
  sand: { background: "var(--sand-200)", color: "var(--ink-0)" },
  leaf: { background: "var(--leaf-200)", color: "var(--ink-0)" },
  success: { background: "var(--status-success-bg)", color: "var(--status-success-fg)" },
  warning: { background: "var(--status-warning-bg)", color: "var(--status-warning-fg)" },
  danger: { background: "var(--status-danger-bg)", color: "var(--status-danger-fg)" },
};
function Badge({ tone = "neutral", icon, children, style, ...rest }) {
  const t = TONES[tone] || TONES.neutral;
  return React.createElement("span", Object.assign({}, rest, {
    style: {
      display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px",
      borderRadius: "var(--radius-pill)", background: t.background, color: t.color,
      fontFamily: "var(--font-text)", fontSize: "var(--size-label)", fontWeight: "var(--weight-semibold)",
      letterSpacing: "0.01em", whiteSpace: "nowrap", ...style,
    },
  }), icon ? React.createElement(__ds_scope.Icon, { name: icon, size: 13 }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const TONES = {
  primary: { background: "var(--mint-300)", color: "var(--ink-0)", border: "1px solid transparent", hover: "var(--mint-400)" },
  secondary: { background: "var(--sand-300)", color: "var(--ink-0)", border: "1px solid transparent", hover: "var(--sand-400)" },
  tertiary: { background: "var(--leaf-200)", color: "var(--ink-0)", border: "1px solid transparent", hover: "var(--leaf-300)" },
  outline: { background: "transparent", color: "var(--ink-0)", border: "1px solid var(--border-default)", hover: "var(--cream-2)" },
  ghost: { background: "transparent", color: "var(--ink-1)", border: "1px solid transparent", hover: "var(--cream-2)" },
  inverse: { background: "var(--ink-0)", color: "var(--cream-0)", border: "1px solid transparent", hover: "var(--ink-1)" },
};
const SIZES = {
  s: { height: "var(--control-height-s)", padding: "0 14px", fontSize: "var(--size-body-s)", gap: 6, icon: 16 },
  m: { height: "var(--control-height-m)", padding: "0 22px", fontSize: "var(--size-body-m)", gap: 8, icon: 18 },
  l: { height: "var(--control-height-l)", padding: "0 30px", fontSize: "var(--size-body-l)", gap: 10, icon: 20 },
};
function Button({ variant = "primary", size = "m", iconLeft, iconRight, fullWidth = false, disabled = false, type = "button", children, style, ...rest }) {
  const t = TONES[variant] || TONES.primary;
  const s = SIZES[size] || SIZES.m;
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  return React.createElement("button", Object.assign({
    type, disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => { setHover(false); setPress(false); },
    onMouseDown: () => setPress(true), onMouseUp: () => setPress(false),
  }, rest, {
    style: {
      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: s.gap,
      height: s.height, padding: s.padding, width: fullWidth ? "100%" : undefined,
      fontFamily: "var(--font-text)", fontSize: s.fontSize, fontWeight: "var(--weight-semibold)",
      letterSpacing: "var(--tracking-snug)", borderRadius: "var(--radius-control)", border: t.border,
      background: disabled ? "var(--cream-2)" : hover ? t.hover : t.background,
      color: disabled ? "var(--ink-4)" : t.color,
      cursor: disabled ? "not-allowed" : "pointer",
      transform: press && !disabled ? "scale(var(--press-scale))" : "none",
      transition: "background var(--duration-fast) var(--ease-standard), transform var(--duration-fast) var(--ease-standard)",
      ...style,
    },
  }),
    iconLeft ? React.createElement(__ds_scope.Icon, { name: iconLeft, size: s.icon }) : null,
    children,
    iconRight ? React.createElement(__ds_scope.Icon, { name: iconRight, size: s.icon }) : null,
  );
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
const TONES = {
  soft: { background: "var(--cream-2)", color: "var(--ink-1)", hover: "var(--cream-3)" },
  accent: { background: "var(--mint-300)", color: "var(--ink-0)", hover: "var(--mint-400)" },
  plain: { background: "transparent", color: "var(--ink-1)", hover: "var(--cream-2)" },
  overlay: { background: "rgba(255,253,248,.86)", color: "var(--ink-0)", hover: "var(--cream-0)" },
};
const SIZES = { s: 32, m: 40, l: 48 };
function IconButton({ icon = "heart", variant = "soft", size = "m", label, active = false, style, ...rest }) {
  const t = TONES[variant] || TONES.soft;
  const px = SIZES[size] || SIZES.m;
  const [hover, setHover] = React.useState(false);
  return React.createElement("button", Object.assign({
    type: "button", "aria-label": label, "aria-pressed": active || undefined,
    onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false),
  }, rest, {
    style: {
      display: "inline-flex", alignItems: "center", justifyContent: "center", width: px, height: px,
      borderRadius: "var(--radius-pill)", border: "none",
      background: active ? "var(--mint-300)" : hover ? t.hover : t.background, color: t.color,
      cursor: "pointer", backdropFilter: variant === "overlay" ? "var(--blur-overlay)" : undefined,
      transition: "background var(--duration-fast) var(--ease-standard)", ...style,
    },
  }), React.createElement(__ds_scope.Icon, { name: icon, size: px <= 32 ? 16 : px <= 40 ? 18 : 20 }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function Tag({ selected = false, removable = false, filled = false, onRemove, children, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return React.createElement("button", Object.assign({
    type: "button", "aria-pressed": selected,
    onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false),
  }, rest, {
    style: {
      display: "inline-flex", alignItems: "center", gap: 6, height: 34,
      padding: removable ? "0 8px 0 14px" : "0 14px", borderRadius: "var(--radius-pill)",
      border: selected ? "1px solid var(--mint-400)" : "1px solid var(--border-default)",
      background: selected ? "var(--mint-200)" : hover ? "var(--cream-2)" : filled ? "var(--surface-card)" : "transparent",
      color: "var(--ink-1)", cursor: "pointer", whiteSpace: "nowrap", flex: "0 0 auto",
      fontFamily: "var(--font-text)", fontSize: "var(--size-body-s)", fontWeight: "var(--weight-medium)",
      transition: "background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)",
      ...style,
    },
  }), children, removable ? React.createElement("span", {
    onClick: (e) => { e.stopPropagation(); onRemove?.(); },
    style: { display: "inline-flex", padding: 3, borderRadius: "var(--radius-pill)", background: "var(--cream-2)" },
  }, React.createElement(__ds_scope.Icon, { name: "x", size: 12 })) : null);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function Dialog({ open = false, title, description, onClose, footer, width = 460, children, style, ...rest }) {
  if (!open) return null;
  return React.createElement("div", {
    onClick: onClose,
    style: { position: "fixed", inset: 0, zIndex: 60, background: "var(--scrim)", backdropFilter: "var(--blur-overlay)", display: "flex", alignItems: "center", justifyContent: "center", padding: "var(--space-6)" },
  }, React.createElement("div", Object.assign({ role: "dialog", "aria-modal": "true", onClick: (e) => e.stopPropagation() }, rest, {
    style: { width: "100%", maxWidth: width, background: "var(--surface-card)", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-l)", padding: "var(--space-8)", display: "flex", flexDirection: "column", gap: "var(--space-5)", ...style },
  }),
    React.createElement("div", { style: { display: "flex", alignItems: "flex-start", gap: "var(--space-4)" } },
      React.createElement("div", { style: { flex: 1, display: "flex", flexDirection: "column", gap: 6 } },
        title ? React.createElement("h3", { style: { fontFamily: "var(--font-display)", fontSize: "var(--size-heading-m)", color: "var(--text-heading)", margin: 0, letterSpacing: "var(--tracking-snug)" } }, title) : null,
        description ? React.createElement("p", { style: { margin: 0, fontSize: "var(--size-body-m)", color: "var(--text-muted)", lineHeight: "var(--leading-normal)" } }, description) : null,
      ),
      onClose ? React.createElement(__ds_scope.IconButton, { icon: "x", variant: "plain", size: "s", label: "Close", onClick: onClose }) : null,
    ),
    children,
    footer ? React.createElement("div", { style: { display: "flex", justifyContent: "flex-end", gap: "var(--space-3)" } }, footer) : null,
  ));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
const TONES = {
  neutral: { bg: "var(--ink-0)", fg: "var(--cream-0)", icon: "info" },
  success: { bg: "var(--mint-300)", fg: "var(--ink-0)", icon: "check" },
  warning: { bg: "var(--amber-200)", fg: "var(--ink-0)", icon: "triangle-alert" },
  danger: { bg: "var(--clay-200)", fg: "var(--ink-0)", icon: "circle-alert" },
};
function Toast({ tone = "neutral", message, action, onAction, onDismiss, style, ...rest }) {
  const t = TONES[tone] || TONES.neutral;
  return React.createElement("div", Object.assign({ role: "status" }, rest, {
    style: { display: "inline-flex", alignItems: "center", gap: "var(--space-3)", padding: "12px 14px 12px 16px", borderRadius: "var(--radius-pill)", background: t.bg, color: t.fg, boxShadow: "var(--shadow-m)", fontFamily: "var(--font-text)", fontSize: "var(--size-body-m)", fontWeight: "var(--weight-medium)", ...style },
  }),
    React.createElement(__ds_scope.Icon, { name: t.icon, size: 18 }),
    React.createElement("span", null, message),
    action ? React.createElement("button", { type: "button", onClick: onAction, style: { border: "none", background: "transparent", color: "inherit", cursor: "pointer", fontFamily: "var(--font-text)", fontSize: "var(--size-body-m)", fontWeight: "var(--weight-semibold)", textDecoration: "underline", textUnderlineOffset: 3, padding: "0 4px" } }, action) : null,
    onDismiss ? React.createElement("button", { type: "button", "aria-label": "Dismiss", onClick: onDismiss, style: { display: "inline-flex", border: "none", background: "transparent", color: "inherit", cursor: "pointer", padding: 4 } }, React.createElement(__ds_scope.Icon, { name: "x", size: 16 })) : null,
  );
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function Tooltip({ content, placement = "top", children, style, ...rest }) {
  const [open, setOpen] = React.useState(false);
  const pos = {
    top: { bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" },
    bottom: { top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" },
    left: { right: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" },
    right: { left: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" },
  }[placement];
  return React.createElement("span", Object.assign({
    onMouseEnter: () => setOpen(true), onMouseLeave: () => setOpen(false),
    onFocus: () => setOpen(true), onBlur: () => setOpen(false),
  }, rest, { style: { position: "relative", display: "inline-flex", ...style } }),
    children,
    open ? React.createElement("span", {
      role: "tooltip",
      style: { position: "absolute", zIndex: 70, ...pos, background: "var(--ink-0)", color: "var(--cream-0)", padding: "7px 12px", borderRadius: "var(--radius-s)", fontFamily: "var(--font-text)", fontSize: "var(--size-body-s)", lineHeight: 1.35, whiteSpace: "nowrap", boxShadow: "var(--shadow-s)", pointerEvents: "none" },
    }, content) : null,
  );
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({ checked = false, onChange, label, description, disabled = false, style, ...rest }) {
  return React.createElement("label", {
    style: { display: "inline-flex", alignItems: description ? "flex-start" : "center", gap: 12, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, ...style },
  },
    React.createElement("input", Object.assign({ type: "checkbox", checked, disabled, onChange: (e) => onChange && onChange(e.target.checked), style: { position: "absolute", opacity: 0, width: 0, height: 0 } }, rest)),
    React.createElement("span", {
      style: { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, flex: "0 0 auto", marginTop: description ? 1 : 0, borderRadius: "var(--radius-xs)", border: checked ? "1px solid var(--mint-400)" : "1px solid var(--border-default)", background: checked ? "var(--mint-300)" : "var(--surface-card)", transition: "background var(--duration-fast) var(--ease-standard)" },
    }, checked ? React.createElement(__ds_scope.Icon, { name: "check", size: 15, color: "var(--ink-0)" }) : null),
    label ? React.createElement("span", { style: { display: "flex", flexDirection: "column", gap: 2 } },
      React.createElement("span", { style: { fontSize: "var(--size-body-m)", color: "var(--text-body)" } }, label),
      description ? React.createElement("span", { style: { fontSize: "var(--size-body-s)", color: "var(--text-subtle)" } }, description) : null,
    ) : null,
  );
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function Input({ label, hint, error, iconLeft, size = "m", disabled = false, id, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const autoId = React.useId();
  const uid = id || autoId;
  const h = size === "s" ? "var(--control-height-s)" : size === "l" ? "var(--control-height-l)" : "var(--control-height-m)";
  return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6, ...style } },
    label ? React.createElement("label", { htmlFor: uid, style: { fontSize: "var(--size-body-s)", fontWeight: "var(--weight-semibold)", color: "var(--text-body)" } }, label) : null,
    React.createElement("div", {
      style: { display: "flex", alignItems: "center", gap: 10, height: h, padding: "0 16px", background: disabled ? "var(--cream-2)" : "var(--surface-card)", border: `1px solid ${error ? "var(--status-danger-fg)" : focus ? "var(--border-focus)" : "var(--border-default)"}`, boxShadow: focus ? "var(--shadow-focus)" : "none", borderRadius: "var(--radius-field)", transition: "border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)" },
    },
      iconLeft ? React.createElement(__ds_scope.Icon, { name: iconLeft, size: 18, color: "var(--ink-3)" }) : null,
      React.createElement("input", Object.assign({ id: uid, disabled, onFocus: () => setFocus(true), onBlur: () => setFocus(false) }, rest, {
        style: { flex: 1, minWidth: 0, border: "none", outline: "none", background: "transparent", fontFamily: "var(--font-text)", fontSize: "16px", color: "var(--text-body)" },
      })),
    ),
    error || hint ? React.createElement("span", { style: { fontSize: "var(--size-body-s)", color: error ? "var(--status-danger-fg)" : "var(--text-subtle)" } }, error || hint) : null,
  );
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function Radio({ checked = false, onChange, label, description, name, value, disabled = false, style, ...rest }) {
  return React.createElement("label", {
    style: { display: "inline-flex", alignItems: description ? "flex-start" : "center", gap: 12, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, ...style },
  },
    React.createElement("input", Object.assign({ type: "radio", name, value, checked, disabled, onChange: () => onChange && onChange(value), style: { position: "absolute", opacity: 0, width: 0, height: 0 } }, rest)),
    React.createElement("span", {
      style: { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, flex: "0 0 auto", borderRadius: "var(--radius-pill)", border: checked ? "1px solid var(--mint-400)" : "1px solid var(--border-default)", background: "var(--surface-card)" },
    }, checked ? React.createElement("span", { style: { width: 11, height: 11, borderRadius: "var(--radius-pill)", background: "var(--mint-500)" } }) : null),
    label ? React.createElement("span", { style: { display: "flex", flexDirection: "column", gap: 2 } },
      React.createElement("span", { style: { fontSize: "var(--size-body-m)", color: "var(--text-body)" } }, label),
      description ? React.createElement("span", { style: { fontSize: "var(--size-body-s)", color: "var(--text-subtle)" } }, description) : null,
    ) : null,
  );
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function Select({ label, hint, options = [], disabled = false, id, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const autoId = React.useId();
  const uid = id || autoId;
  return React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6, ...style } },
    label ? React.createElement("label", { htmlFor: uid, style: { fontSize: "var(--size-body-s)", fontWeight: "var(--weight-semibold)", color: "var(--text-body)" } }, label) : null,
    React.createElement("div", {
      style: { position: "relative", display: "flex", alignItems: "center", height: "var(--control-height-m)", borderRadius: "var(--radius-field)", background: disabled ? "var(--cream-2)" : "var(--surface-card)", border: `1px solid ${focus ? "var(--border-focus)" : "var(--border-default)"}`, boxShadow: focus ? "var(--shadow-focus)" : "none" },
    },
      React.createElement("select", Object.assign({ id: uid, disabled, onFocus: () => setFocus(true), onBlur: () => setFocus(false) }, rest, {
        style: { appearance: "none", WebkitAppearance: "none", flex: 1, height: "100%", padding: "0 42px 0 16px", border: "none", outline: "none", background: "transparent", fontFamily: "var(--font-text)", fontSize: "16px", color: "var(--text-body)", cursor: disabled ? "not-allowed" : "pointer", borderRadius: "var(--radius-field)" },
      }), options.map((o) => {
        const value = typeof o === "string" ? o : o.value;
        const lbl = typeof o === "string" ? o : o.label;
        return React.createElement("option", { key: value, value }, lbl);
      })),
      React.createElement(__ds_scope.Icon, { name: "chevron-down", size: 18, color: "var(--ink-3)", style: { position: "absolute", right: 14, pointerEvents: "none" } }),
    ),
    hint ? React.createElement("span", { style: { fontSize: "var(--size-body-s)", color: "var(--text-subtle)" } }, hint) : null,
  );
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({ checked = false, onChange, label, disabled = false, style, ...rest }) {
  return React.createElement("label", {
    style: { display: "inline-flex", alignItems: "center", gap: 12, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, ...style },
  },
    React.createElement("input", Object.assign({ type: "checkbox", role: "switch", checked, disabled, onChange: (e) => onChange && onChange(e.target.checked), style: { position: "absolute", opacity: 0, width: 0, height: 0 } }, rest)),
    React.createElement("span", {
      style: { position: "relative", width: 48, height: 28, flex: "0 0 auto", borderRadius: "var(--radius-pill)", background: checked ? "var(--mint-400)" : "var(--cream-3)", transition: "background var(--duration-base) var(--ease-standard)" },
    }, React.createElement("span", { style: { position: "absolute", top: 3, left: checked ? 23 : 3, width: 22, height: 22, borderRadius: "var(--radius-pill)", background: "var(--cream-0)", boxShadow: "var(--shadow-xs)", transition: "left var(--duration-base) var(--ease-out)" } })),
    label ? React.createElement("span", { style: { fontSize: "var(--size-body-m)", color: "var(--text-body)" } }, label) : null,
  );
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function Tabs({ items = [], value, onChange, variant = "pill", style, ...rest }) {
  const active = value ?? (items[0] && (items[0].value ?? items[0]));
  const norm = items.map((i) => (typeof i === "string" ? { value: i, label: i } : i));
  if (variant === "underline") {
    return React.createElement("div", Object.assign({ role: "tablist" }, rest, {
      style: { display: "flex", gap: "var(--space-6)", borderBottom: "1px solid var(--border-subtle)", ...style },
    }), norm.map((i) => {
      const on = i.value === active;
      return React.createElement("button", {
        key: i.value, role: "tab", "aria-selected": on, onClick: () => onChange && onChange(i.value),
        style: { border: "none", background: "transparent", cursor: "pointer", padding: "10px 2px 12px", fontFamily: "var(--font-text)", fontSize: "var(--size-body-m)", fontWeight: on ? "var(--weight-semibold)" : "var(--weight-medium)", color: on ? "var(--text-heading)" : "var(--text-subtle)", boxShadow: on ? "inset 0 -2px 0 0 var(--mint-500)" : "none" },
      }, i.label);
    }));
  }
  return React.createElement("div", Object.assign({ role: "tablist" }, rest, {
    style: { display: "inline-flex", gap: 4, padding: 4, background: "var(--cream-2)", borderRadius: "var(--radius-pill)", ...style },
  }), norm.map((i) => {
    const on = i.value === active;
    return React.createElement("button", {
      key: i.value, role: "tab", "aria-selected": on, onClick: () => onChange && onChange(i.value),
      style: { border: "none", cursor: "pointer", padding: "0 18px", height: 36, borderRadius: "var(--radius-pill)", background: on ? "var(--surface-card)" : "transparent", boxShadow: on ? "var(--shadow-xs)" : "none", fontFamily: "var(--font-text)", fontSize: "var(--size-body-s)", fontWeight: "var(--weight-semibold)", color: on ? "var(--text-heading)" : "var(--text-muted)", transition: "background var(--duration-fast) var(--ease-standard)" },
    }, i.label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/recipes/DietaryChips.jsx
try { (() => {
const DIETARY_LABELS = ["Nut-free", "Dairy-free", "Gluten-free", "Meat-free"];
function DietaryChips({ options = DIETARY_LABELS, value = [], onChange, style, ...rest }) {
  const normalized = options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));
  const toggle = (optionValue) => {
    if (!onChange) return;
    onChange(value.includes(optionValue) ? value.filter((v) => v !== optionValue) : [...value, optionValue]);
  };
  return React.createElement("div", Object.assign({}, rest, { style: { display: "flex", flexWrap: "wrap", gap: 8, ...style } }),
    normalized.map((o) => React.createElement(__ds_scope.Tag, { key: o.value, selected: value.includes(o.value), filled: true, onClick: () => toggle(o.value) }, o.label)));
}
Object.assign(__ds_scope, { DIETARY_LABELS, DietaryChips });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/recipes/DietaryChips.jsx", error: String((e && e.message) || e) }); }

// components/recipes/MacroBar.jsx
try { (() => {
function MacroBar({ protein = 0, carbs = 0, fat = 0, showLegend = true, height = 10, style, ...rest }) {
  const total = Math.max(protein + carbs + fat, 1);
  const parts = [
    { key: "Protein", grams: protein, color: "var(--macro-protein)" },
    { key: "Carbs", grams: carbs, color: "var(--macro-carb)" },
    { key: "Fat", grams: fat, color: "var(--macro-fat)" },
  ];
  return React.createElement("div", Object.assign({}, rest, { style: { display: "flex", flexDirection: "column", gap: 10, ...style } }),
    React.createElement("div", { style: { display: "flex", gap: 3, height, borderRadius: "var(--radius-pill)", overflow: "hidden", background: "var(--cream-2)" } },
      parts.map((p) => React.createElement("span", { key: p.key, style: { width: `${(p.grams / total) * 100}%`, background: p.color, borderRadius: "var(--radius-pill)" } }))),
    showLegend ? React.createElement("div", { style: { display: "flex", gap: "var(--space-5)" } },
      parts.map((p) => React.createElement("span", { key: p.key, style: { display: "inline-flex", alignItems: "center", gap: 7 } },
        React.createElement("span", { style: { width: 8, height: 8, borderRadius: "var(--radius-pill)", background: p.color } }),
        React.createElement("span", { style: { fontSize: "var(--size-body-s)", color: "var(--text-muted)" } }, p.key),
        React.createElement("span", { style: { fontFamily: "var(--font-mono)", fontSize: "var(--size-body-s)", color: "var(--text-heading)" } }, p.grams, "g"),
      ))) : null,
  );
}
Object.assign(__ds_scope, { MacroBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/recipes/MacroBar.jsx", error: String((e && e.message) || e) }); }

// components/recipes/TimePill.jsx
try { (() => {
function timeTier(minutes) {
  if (minutes == null) return null;
  if (minutes <= 15) return "quick";
  if (minutes <= 30) return "moderate";
  return "long";
}
const TIERS = {
  quick: { bg: "var(--mint-300)", fg: "var(--ink-0)" },
  moderate: { bg: "var(--paprika-200)", fg: "var(--paprika-500)" },
  long: { bg: "var(--paprika-400)", fg: "var(--text-on-bold)" },
};
function TimePill({ minutes, size = "m", style, ...rest }) {
  const tier = TIERS[timeTier(minutes) || "quick"];
  const s = size === "s";
  return React.createElement("span", Object.assign({}, rest, {
    style: { display: "inline-flex", alignItems: "center", gap: s ? 4 : 5, height: s ? 24 : 28, padding: s ? "0 8px" : "0 10px", borderRadius: "var(--radius-pill)", background: tier.bg, color: tier.fg, fontFamily: "var(--font-text)", fontWeight: "var(--weight-semibold)", fontSize: s ? 12 : "var(--size-body-s)", whiteSpace: "nowrap", ...style },
  }), React.createElement(__ds_scope.Icon, { name: "clock", size: s ? 13 : 15 }), minutes, " min");
}
Object.assign(__ds_scope, { timeTier, TimePill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/recipes/TimePill.jsx", error: String((e && e.message) || e) }); }

// components/recipes/RecipeCard.jsx
try { (() => {
const TINTS = ["var(--sand-200)", "var(--mint-200)", "var(--leaf-300)"];
function Stat({ icon, children }) {
  return React.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: 5, whiteSpace: "nowrap" } },
    React.createElement(__ds_scope.Icon, { name: icon, size: 15, color: "var(--ink-3)" }), children);
}
function RecipeCard({ title = "Untitled recipe", image, tint = 0, minutes, protein, calories, servings, tags = [], saved = false, onSave, layout = "vertical", style, ...rest }) {
  const horizontal = layout === "horizontal";
  const media = React.createElement("div", {
    style: { position: "relative", width: horizontal ? 124 : "100%", height: horizontal ? undefined : 132, minHeight: horizontal ? 124 : undefined, flex: "0 0 auto", background: image ? `url(${image}) center/cover` : TINTS[tint % TINTS.length], display: "flex", alignItems: "center", justifyContent: "center" },
  },
    !image ? React.createElement(__ds_scope.Icon, { name: "utensils-crossed", size: 26, color: "rgba(28,32,25,.30)" }) : null,
    onSave ? React.createElement(__ds_scope.IconButton, {
      icon: "heart", variant: "overlay", size: "s", label: saved ? "Remove from favorites" : "Add to favorites", active: saved,
      onClick: (e) => { e.stopPropagation(); onSave(); },
      style: { position: "absolute", top: 8, right: 8 },
    }) : null,
  );
  return React.createElement(__ds_scope.Card, Object.assign({ padding: "none", interactive: true }, rest, {
    style: { overflow: "hidden", display: "flex", flexDirection: horizontal ? "row" : "column", ...style },
  }),
    media,
    React.createElement("div", { style: { padding: "var(--space-4)", display: "flex", flexDirection: "column", gap: 8, flex: 1, minWidth: 0 } },
      React.createElement("h3", { style: { fontFamily: "var(--font-display)", fontSize: "var(--size-heading-s)", fontWeight: "var(--weight-semibold)", color: "var(--text-heading)", margin: 0, letterSpacing: "var(--tracking-snug)" } }, title),
      React.createElement("div", { style: { display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px 12px", color: "var(--text-muted)", fontSize: "var(--size-body-s)" } },
        calories != null ? React.createElement(Stat, { icon: "flame" }, calories, " kcal") : null,
        protein != null ? React.createElement(Stat, { icon: "dumbbell" }, protein, "g protein") : null,
        servings != null ? React.createElement(Stat, { icon: "users" }, servings, servings === 1 ? " serving" : " servings") : null,
      ),
      tags.length ? React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 6, marginTop: 2 } },
        tags.map((t) => React.createElement(__ds_scope.Badge, { key: t, tone: "neutral" }, t))) : null,
      minutes != null ? React.createElement("div", { style: { marginTop: "auto", paddingTop: 4 } },
        React.createElement(__ds_scope.TimePill, { minutes, size: "s" })) : null,
    ),
  );
}
Object.assign(__ds_scope, { RecipeCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/recipes/RecipeCard.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;
__ds_ns.Button = __ds_scope.Button;
__ds_ns.Card = __ds_scope.Card;
__ds_ns.Icon = __ds_scope.Icon;
__ds_ns.IconButton = __ds_scope.IconButton;
__ds_ns.Tag = __ds_scope.Tag;
__ds_ns.Dialog = __ds_scope.Dialog;
__ds_ns.Toast = __ds_scope.Toast;
__ds_ns.Tooltip = __ds_scope.Tooltip;
__ds_ns.Checkbox = __ds_scope.Checkbox;
__ds_ns.Input = __ds_scope.Input;
__ds_ns.Radio = __ds_scope.Radio;
__ds_ns.Select = __ds_scope.Select;
__ds_ns.Switch = __ds_scope.Switch;
__ds_ns.Tabs = __ds_scope.Tabs;
__ds_ns.DIETARY_LABELS = __ds_scope.DIETARY_LABELS;
__ds_ns.DietaryChips = __ds_scope.DietaryChips;
__ds_ns.MacroBar = __ds_scope.MacroBar;
__ds_ns.RecipeCard = __ds_scope.RecipeCard;
__ds_ns.TimePill = __ds_scope.TimePill;

})();
