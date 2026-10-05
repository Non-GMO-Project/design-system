// Showcase behavior: brand and mode switches, demos, and motion players.
// Motion demos read duration and easing tokens from CSS at play time.
(() => {
  const root = document.documentElement;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const css = (name, el = root) => getComputedStyle(el).getPropertyValue(name).trim();
  const ms = (name) => {
    const v = css(name);
    return v.endsWith("ms") ? parseFloat(v) : v.endsWith("s") ? parseFloat(v) * 1000 : 200;
  };
  const reduced = () => root.classList.contains("reduce-motion") || matchMedia("(prefers-reduced-motion: reduce)").matches;
  const dur = (name) => (reduced() ? 0 : ms(name));

  // ---------- Brand, mode, reduced motion ----------
  const saved = JSON.parse(localStorage.getItem("fip-ds") || "{}");
  const apply = () => {
    root.dataset.brand = saved.brand || "fip";
    root.classList.toggle("dark", !!saved.dark);
    root.classList.toggle("reduce-motion", !!saved.reduce);
    $$('input[name="brand"]').forEach((i) => (i.checked = i.value === root.dataset.brand));
    $$('select[name="brand"]').forEach((s) => (s.value = root.dataset.brand));
    $$("[data-toggle-dark]").forEach((i) => (i.checked = !!saved.dark));
    $$("[data-toggle-reduce]").forEach((i) => (i.checked = !!saved.reduce));
    requestAnimationFrame(() => { updateLiveTokens(); $$("[data-tabs]").forEach(placeIndicator); });
  };
  const persist = () => localStorage.setItem("fip-ds", JSON.stringify(saved));
  document.addEventListener("change", (e) => {
    const t = e.target;
    if (t.name === "brand") { saved.brand = t.value; persist(); apply(); }
    if (t.matches("[data-toggle-dark]")) { saved.dark = t.checked; persist(); apply(); }
    if (t.matches("[data-toggle-reduce]")) { saved.reduce = t.checked; persist(); apply(); }
  });

  function updateLiveTokens() {
    $$("[data-live-token]").forEach((el) => (el.querySelector("span").textContent = css(el.dataset.liveToken) || "(not set)"));
  }

  // ---------- Toasts and copy ----------
  const toasts = document.createElement("div");
  toasts.className = "toasts";
  toasts.setAttribute("aria-live", "polite");
  document.body.append(toasts);
  function toast(text, undo = true) {
    const tpl = $("#tpl-toast-icon");
    const el = document.createElement("div");
    el.className = "toast";
    el.innerHTML = (tpl ? tpl.innerHTML : "") + `<span>${text}</span>` + (undo ? '<button class="btn btn--ghost btn--sm" type="button">Undo</button>' : "");
    toasts.append(el);
    const remove = () => el.animate([{ opacity: 1 }, { opacity: 0, transform: "translateY(8px)" }], { duration: dur("--duration-base"), easing: css("--ease-exit") }).finished.then(() => el.remove());
    el.querySelector("button")?.addEventListener("click", remove);
    setTimeout(remove, 5000);
  }
  document.addEventListener("click", (e) => {
    const c = e.target.closest("[data-copy]");
    if (!c) return;
    navigator.clipboard?.writeText(c.dataset.copy);
    toast(`Copied ${c.dataset.copy}`, false);
  });

  // ---------- Tabs ----------
  function placeIndicator(tabs) {
    const sel = $('[role="tab"][aria-selected="true"]', tabs);
    const ind = $(".indicator", tabs);
    if (!sel || !ind) return;
    ind.style.width = sel.offsetWidth + "px";
    ind.style.transform = `translateX(${sel.offsetLeft}px)`;
  }
  $$("[data-tabs]").forEach((tabs) => {
    const list = $$('[role="tab"]', tabs);
    const select = (tab) => {
      list.forEach((t) => {
        const on = t === tab;
        t.setAttribute("aria-selected", on);
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      });
      placeIndicator(tabs);
    };
    list.forEach((t, i) => {
      t.addEventListener("click", () => select(t));
      t.addEventListener("keydown", (e) => {
        const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (!d) return;
        const n = list[(i + d + list.length) % list.length];
        n.focus();
        select(n);
      });
    });
    placeIndicator(tabs);
  });
  addEventListener("resize", () => $$("[data-tabs]").forEach(placeIndicator));

  // ---------- Overlays ----------
  document.addEventListener("click", (e) => {
    const open = e.target.closest("[data-open]");
    if (open) document.getElementById(open.dataset.open)?.showModal();
    const close = e.target.closest("[data-close]");
    if (close) close.closest("dialog").close();
    if (e.target.tagName === "DIALOG") e.target.close();
    if (e.target.closest("#mobile-nav a")) $("#mobile-nav").close();
    const menu = e.target.closest('[data-demo="menu"]');
    $$('[data-demo="menu"]').forEach((m) => {
      if (m !== menu) { m.setAttribute("aria-expanded", "false"); m.nextElementSibling.hidden = true; }
    });
    if (menu) {
      const pop = menu.nextElementSibling;
      pop.hidden = !pop.hidden;
      menu.setAttribute("aria-expanded", String(!pop.hidden));
      if (!pop.hidden) pop.querySelector("button").focus();
    }
    if (e.target.closest('[data-demo="toast"]')) toast("Product submitted");
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    $$('[data-demo="menu"][aria-expanded="true"]').forEach((m) => { m.setAttribute("aria-expanded", "false"); m.nextElementSibling.hidden = true; m.focus(); });
  });

  // ---------- Button loading ----------
  document.addEventListener("click", (e) => {
    const b = e.target.closest('[data-demo="loading"]');
    if (!b || b.disabled) return;
    const svg = b.querySelector("svg");
    const spinner = $("#tpl-spinner").content.firstElementChild.cloneNode(true);
    svg.replaceWith(spinner);
    b.disabled = true;
    b.setAttribute("aria-busy", "true");
    setTimeout(() => { spinner.replaceWith(svg); b.disabled = false; b.removeAttribute("aria-busy"); toast("Spec sheet uploaded"); }, 1800);
  });

  // ---------- Form validation (field-error) ----------
  $$('[data-demo="form"]').forEach((form) => {
    const name = $("#f-name", form);
    const errId = "f-name-error";
    const showError = () => {
      if ($("#" + errId)) return;
      name.setAttribute("aria-invalid", "true");
      name.setAttribute("aria-describedby", `${errId} f-name-help`);
      const p = document.createElement("p");
      p.className = "error";
      p.id = errId;
      p.innerHTML = ($("#tpl-error-icon")?.innerHTML ?? "") + "Enter the product name as it appears on pack.";
      name.after(p);
    };
    const clear = () => {
      name.removeAttribute("aria-invalid");
      name.setAttribute("aria-describedby", "f-name-help");
      $("#" + errId)?.remove();
    };
    name.addEventListener("blur", () => (name.value.trim() ? clear() : null));
    name.addEventListener("input", () => name.value.trim() && clear());
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!name.value.trim()) { showError(); name.focus(); } else { clear(); toast("Product submitted for review"); }
    });
  });

  // ---------- Table: add, remove chips, search ----------
  let added = 0;
  document.addEventListener("click", (e) => {
    if (e.target.closest('[data-demo="add-row"]')) {
      const body = $("#demo-table tbody");
      const tr = body.rows[0].cloneNode(true);
      tr.removeAttribute("aria-selected");
      tr.querySelector("strong").textContent = ["Sunflower Seed Butter", "Black Bean Chips", "Oat Milk Barista"][added++ % 3];
      tr.querySelector("input").checked = false;
      tr.classList.add("row-enter");
      body.prepend(tr);
      $("#t-count").textContent = `${body.rows.length} products`;
      toast("Product added");
    }
    const rm = e.target.closest(".chip--removable button");
    if (rm) {
      const chip = rm.closest(".chip");
      chip.animate([{ opacity: 1 }, { opacity: 0, transform: "scale(0.96)" }], { duration: dur("--duration-base"), easing: css("--ease-exit") }).finished.then(() => chip.remove());
    }
  });
  $$('[data-demo="search"]').forEach((input) =>
    input.addEventListener("input", () => {
      const q = input.value.toLowerCase();
      const rows = $$("#demo-table tbody tr");
      let n = 0;
      rows.forEach((r) => { const hit = r.textContent.toLowerCase().includes(q); r.hidden = !hit; n += hit; });
      $("#t-count").textContent = `${n} ${n === 1 ? "product" : "products"}`;
    })
  );

  // ---------- Motion: tracks ----------
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-play-track]");
    if (!b) return;
    const dot = b.closest(".motion-card").querySelector(".dot");
    const track = dot.parentElement;
    const dist = track.clientWidth - 40;
    dot.animate([{ transform: "translateX(0)" }, { transform: `translateX(${dist}px)` }], { duration: Math.max(dur(b.dataset.duration), reduced() ? 0 : 1), easing: css(b.dataset.ease) || "linear", fill: "forwards" });
  });

  // ---------- Motion: named animations ----------
  const box = () => '<div class="demo-box"></div>';
  const stages = {
    "fade-in": box, "pop-in": box, "dialog-in": box, press: box, "focus-ring": () => '<button class="btn btn--default btn--sm" type="button">Focus me</button>',
    "sheet-in": () => '<div class="demo-box" style="position:absolute;right:0;top:0;bottom:0;width:40%;height:auto;border-radius:0"></div>',
    "toast-in": () => '<div class="toast" style="position:absolute;bottom:8px;right:8px;min-width:0;animation:none;padding:0.5rem 0.75rem"><span class="small">Product submitted</span></div>',
    expand: () => '<div style="width:80%"><div class="small" style="font-weight:700">Show details</div><div data-x class="small muted" style="overflow:hidden">Ingredients, testing and documents.</div></div>',
    "tab-switch": () => '<div class="tabs" style="width:90%"><div role="presentation" style="display:flex;position:relative;border-bottom:1px solid var(--border)"><span class="small" style="padding:0.25rem 0.75rem;flex:1;text-align:center">One</span><span class="small" style="padding:0.25rem 0.75rem;flex:1;text-align:center">Two</span><span class="indicator" data-x style="width:50%;left:0"></span></div></div>',
    "row-enter": () => '<div style="width:90%;display:grid;gap:4px"><div class="small" style="padding:4px 8px;border:1px solid var(--border);border-radius:4px">Existing row</div></div>',
    "row-exit": () => '<div style="width:90%;display:grid;gap:4px"><div data-x class="small" style="padding:4px 8px;border:1px solid var(--border);border-radius:4px;overflow:hidden">Row to archive</div><div class="small" style="padding:4px 8px;border:1px solid var(--border);border-radius:4px">Remaining row</div></div>',
    reorder: () => '<div style="display:flex;gap:6px">' + ["A", "B", "C", "D"].map((l) => `<div class="demo-box" style="width:36px;height:36px;display:grid;place-items:center;font-weight:700">${l}</div>`).join("") + "</div>",
    "hover-lift": () => '<div class="card" style="padding:0.75rem 1rem">Interactive card</div>',
    skeleton: () => '<div style="width:80%;display:grid;gap:6px"><div class="skeleton" style="height:12px"></div><div class="skeleton" style="height:12px;width:70%"></div></div>',
    spin: () => '<button class="btn btn--default btn--sm" type="button" disabled>' + ($("#tpl-spinner")?.innerHTML ?? "") + "Saving</button>",
    "status-change": () => `<span data-x>${$("#tpl-pending")?.innerHTML ?? ""}</span>`,
    "field-error": () => '<div style="width:85%"><input class="input" aria-label="Demo field" aria-invalid="false" style="height:32px"><div data-x></div></div>',
    "page-enter": () => '<div style="display:grid;gap:4px;width:80%"><div class="eyebrow" style="margin:0">Eyebrow</div><div style="font-family:var(--font-serif);font-size:1.25rem">Headline</div><div class="small">Supporting text</div></div>',
  };
  $$("[data-stage]").forEach((s) => (s.innerHTML = (stages[s.dataset.stage] || box)()));

  const players = {
    "fade-in": (el, o) => el.firstElementChild.animate([{ opacity: 0 }, { opacity: 1 }], o),
    "pop-in": (el, o) => el.firstElementChild.animate([{ opacity: 0, transform: "scale(0.96)" }, { opacity: 1, transform: "scale(1)" }], o),
    "dialog-in": (el, o) => el.firstElementChild.animate([{ opacity: 0, transform: "translateY(4px) scale(0.98)" }, { opacity: 1, transform: "none" }], o),
    "sheet-in": (el, o) => el.firstElementChild.animate([{ transform: "translateX(100%)" }, { transform: "none" }], { ...o, easing: "cubic-bezier(0.2, 0.9, 0.3, 1)" }),
    "toast-in": (el, o) => el.firstElementChild.animate([{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "none" }], o),
    expand: (el, o) => { const x = $("[data-x]", el); const h = x.scrollHeight; x.animate([{ height: "0px", opacity: 0 }, { height: h + "px", opacity: 1 }], o); },
    "tab-switch": (el, o) => { const x = $("[data-x]", el); const on = x.dataset.on === "1"; x.dataset.on = on ? "0" : "1"; x.animate([{ transform: `translateX(${on ? 100 : 0}%)` }, { transform: `translateX(${on ? 0 : 100}%)` }], { ...o, fill: "forwards" }); },
    "row-enter": (el, o) => {
      const list = el.firstElementChild;
      const row = document.createElement("div");
      row.className = "small";
      row.style.cssText = "padding:4px 8px;border:1px solid var(--border);border-radius:4px";
      row.textContent = "New row";
      list.prepend(row);
      row.animate([{ opacity: 0 }, { opacity: 1 }], o);
      row.animate([{ background: css("--brand-subtle", el) }, { background: "transparent" }], { duration: reduced() ? 0 : 1000, delay: o.duration, easing: "linear" });
      if (list.children.length > 3) list.lastElementChild.remove();
    },
    "row-exit": (el, o) => { const x = $("[data-x]", el); const h = x.offsetHeight; x.animate([{ opacity: 1, height: h + "px" }, { opacity: 0, height: "0px", paddingTop: 0, paddingBottom: 0 }], { ...o, fill: "forwards" }).finished.then(() => setTimeout(() => (el.innerHTML = stages["row-exit"]()), 600)); },
    reorder: (el, o) => {
      const wrap = el.firstElementChild;
      const items = [...wrap.children];
      const first = new Map(items.map((i) => [i, i.getBoundingClientRect().left]));
      items.sort(() => Math.random() - 0.5).forEach((i) => wrap.append(i));
      items.forEach((i) => { const dx = first.get(i) - i.getBoundingClientRect().left; if (dx) i.animate([{ transform: `translateX(${dx}px)` }, { transform: "none" }], { duration: reduced() ? 0 : 320, easing: "cubic-bezier(0.2, 0.9, 0.3, 1.05)" }); });
    },
    press: (el, o) => el.firstElementChild.animate([{ transform: "scale(1)" }, { transform: "scale(0.98)" }, { transform: "scale(1)" }], o),
    "hover-lift": (el, o) => el.firstElementChild.animate([{ boxShadow: css("--elevation-1") }, { boxShadow: css("--elevation-2") }, { boxShadow: css("--elevation-1") }], { ...o, duration: o.duration * 6 }),
    "focus-ring": (el) => el.querySelector("button").focus(),
    skeleton: (el) => { el.innerHTML = stages.skeleton(); setTimeout(() => (el.innerHTML = '<p class="small" style="margin:0;width:80%">Loaded content replaces the skeleton.</p>'), 1500); setTimeout(() => (el.innerHTML = stages.skeleton()), 3500); },
    spin: () => {},
    "status-change": (el, o) => {
      const x = $("[data-x]", el);
      const next = x.dataset.state === "v" ? "#tpl-pending" : "#tpl-verified";
      x.dataset.state = x.dataset.state === "v" ? "p" : "v";
      x.animate([{ opacity: 1 }, { opacity: 0 }], { duration: o.duration / 2 }).finished.then(() => {
        x.innerHTML = $(next).innerHTML;
        x.animate([{ opacity: 0 }, { opacity: 1 }], { duration: o.duration / 2 });
        x.querySelector("svg")?.animate([{ transform: "scale(0.9)" }, { transform: "scale(1)" }], { duration: o.duration, easing: css("--ease-emphasized") });
      });
    },
    "field-error": (el) => {
      const x = $("[data-x]", el);
      const input = el.querySelector("input");
      if (x.innerHTML) { x.innerHTML = ""; input.setAttribute("aria-invalid", "false"); return; }
      input.setAttribute("aria-invalid", "true");
      x.innerHTML = `<p class="error">${$("#tpl-error-icon")?.innerHTML ?? ""}Enter a product name.</p>`;
    },
    "page-enter": (el, o) => [...el.firstElementChild.children].forEach((c, i) => c.animate([{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "none" }], { ...o, delay: reduced() ? 0 : i * 60, fill: "backwards" })),
  };
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-play]");
    if (!b) return;
    const stage = b.closest(".motion-card").querySelector("[data-stage]");
    const o = { duration: dur(b.dataset.duration), easing: css(b.dataset.ease) || "ease" };
    (players[b.dataset.play] || players["fade-in"])(stage, o);
  });

  // ---------- Signature moment ----------
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-play-sig]");
    if (!b) return;
    const wrap = b.parentElement.querySelector("[data-sig]");
    const slot = wrap.querySelector("[data-sig-badge]");
    const toVerified = !wrap.dataset.verified;
    slot.innerHTML = $(toVerified ? "#tpl-verified" : "#tpl-pending").innerHTML;
    wrap.dataset.verified = toVerified ? "1" : "";
    b.textContent = toVerified ? "Reset" : "Approve verification";
    wrap.classList.remove("sig-play");
    if (toVerified && !reduced()) { void wrap.offsetWidth; wrap.classList.add("sig-play"); }
  });

  // ---------- UX definition of done checklist ----------
  document.addEventListener("change", (e) => {
    if (!e.target.matches("[data-dod]")) return;
    const boxes = $$("[data-dod]");
    $("[data-dod-count]").textContent = `${boxes.filter((b) => b.checked).length} of ${boxes.length} done`;
  });

  // ---------- Responsive section ----------
  const bpSection = $("[data-bps]");
  if (bpSection) {
    const bps = JSON.parse(bpSection.dataset.bps);
    const readout = $("[data-bp-readout]");
    const dot = $("[data-bp-indicator]");
    const update = () => {
      const w = root.clientWidth;
      const cur = [...bps].reverse().find((b) => w >= b.min) ?? bps[0];
      readout.textContent = `This window is ${w}px wide, so the ${cur.name} breakpoint applies: ${cur.layout}.`;
      dot.style.left = Math.min(100, (w / 1600) * 100) + "%";
      $$("[data-bp]").forEach((m) => m.classList.toggle("is-current", m.dataset.bp === cur.name));
      $$("[data-bp-card]").forEach((c) => c.classList.toggle("is-current", c.dataset.bpCard === cur.name));
    };
    addEventListener("resize", update);
    update();
    const range = $("[data-cq-range]"), frame = $("[data-cq-frame]"), out = $("[data-cq-out]");
    const fit = () => (range.max = Math.max(320, frame.parentElement.clientWidth));
    range?.addEventListener("input", () => { frame.style.width = range.value + "px"; out.textContent = range.value + "px"; });
    addEventListener("resize", fit);
    fit();
    range.value = range.max;
  }
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-preview]");
    if (!b) return;
    const w = +b.dataset.preview, h = 760;
    const box = $("[data-previews]");
    box.innerHTML = "";
    const wrap = document.createElement("div");
    wrap.className = "preview";
    const iframe = document.createElement("iframe");
    iframe.src = location.href.split("#")[0].split("?")[0] + "?frame=1#components";
    iframe.width = w;
    iframe.height = h;
    iframe.title = `This showcase at ${w}px wide`;
    iframe.loading = "lazy";
    const s = Math.min(1, box.clientWidth / w);
    iframe.style.transform = `scale(${s})`;
    wrap.style.width = w * s + "px";
    wrap.style.height = h * s + "px";
    wrap.append(iframe);
    box.append(wrap);
  });
  if (new URLSearchParams(location.search).has("frame")) $$("[data-preview]").forEach((b) => (b.disabled = true));

  // ---------- Side navigation: current section ----------
  const links = new Map($$(".sidenav a").map((a) => [a.getAttribute("href").slice(1), a]));
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((a) => a.removeAttribute("aria-current"));
      links.get(en.target.id)?.setAttribute("aria-current", "true");
    });
  }, { rootMargin: "-20% 0px -70% 0px" });
  links.forEach((_, id) => { const el = document.getElementById(id); if (el) spy.observe(el); });

  apply();
})();
