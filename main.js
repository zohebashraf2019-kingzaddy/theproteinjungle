(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- nav: scrolled state + mobile drawer ---------- */
  const nav = $(".nav");
  const bar = $(".order-bar");
  const onScroll = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 24);
    if (bar) bar.classList.toggle("is-shown", window.scrollY > window.innerHeight * 0.9);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const toggle = $(".nav__toggle");
  const setDrawer = (open) => {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  toggle.addEventListener("click", () => setDrawer(!nav.classList.contains("is-open")));
  $$("#drawer a").forEach((a) => a.addEventListener("click", () => setDrawer(false)));

  /* ---------- reveal on scroll ---------- */
  const revealIO = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-in"); revealIO.unobserve(e.target); }
    }),
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  const observeReveals = (root = document) => $$(".reveal:not(.is-in)", root).forEach((el) => revealIO.observe(el));
  observeReveals();

  /* ---------- open now (Pacific time) ---------- */
  const HOURS = { 0: [9, 13], 1: [7, 17], 2: [7, 17], 3: [7, 17], 4: [7, 17], 5: [7, 17], 6: [9, 13] };
  const fmt = (h) => (h === 12 ? "12 pm" : h > 12 ? `${h - 12} pm` : `${h} am`);
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Los_Angeles", weekday: "short", hour: "numeric", minute: "numeric", hour12: false
    }).formatToParts(new Date());
    const get = (t) => parts.find((p) => p.type === t).value;
    const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
    const now = (parseInt(get("hour"), 10) % 24) + parseInt(get("minute"), 10) / 60;
    const [o, c] = HOURS[day];
    const open = now >= o && now < c;
    const row = $(`#hoursTable tr[data-day="${day}"]`);
    if (row) row.classList.add("is-today");
    const dot = $("#openDot"), text = $("#openText");
    if (open) {
      dot.classList.add("is-open");
      text.textContent = `Open now · until ${fmt(c)} today`;
    } else {
      let nd = day, label;
      if (now < o) label = `today at ${fmt(o)}`;
      else { nd = (day + 1) % 7; label = `tomorrow at ${fmt(HOURS[nd][0])}`; }
      text.textContent = `Closed now · opens ${label}`;
    }
  } catch (_) { /* keep default text */ }

  /* ---------- menu ---------- */
  const tabs = $("#menuTabs"), grid = $("#menuGrid"), blurb = $("#menuBlurb");
  const money = (n) => `$${Number(n).toFixed(2)}`;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const placeholder = `<div class="mi__ph" aria-hidden="true"><svg viewBox="0 0 100 160"><use href="#leaf"/></svg><span>TPJ</span></div>`;

  const card = (it, i) => `
    <a class="mi reveal" style="--d:${Math.min(i, 12) * 40}ms" href="${window.ORDER_URL}" target="_blank" rel="noopener" aria-label="Order ${esc(it.name)}, ${money(it.price)}">
      <div class="mi__img">
        ${it.img ? `<img src="/assets/img/menu/${it.img}" alt="${esc(it.name)}" loading="lazy" width="480" height="480">` : placeholder}
        ${it.tag ? `<span class="mi__tag">${esc(it.tag)}</span>` : ""}
        <span class="mi__order">Order <b>→</b></span>
      </div>
      <div class="mi__meta"><h3>${esc(it.name)}</h3><span>${money(it.price)}</span></div>
    </a>`;

  const show = (id) => {
    const cat = window.MENU.find((c) => c.id === id) || window.MENU[0];
    $$(".tab", tabs).forEach((t) => {
      const on = t.dataset.id === cat.id;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
    });
    blurb.textContent = cat.blurb;
    grid.classList.remove("is-swap"); void grid.offsetWidth; grid.classList.add("is-swap");
    grid.innerHTML = cat.items.map(card).join("");
    observeReveals(grid);
    try { localStorage.setItem("tpj-tab", cat.id); } catch (_) {}
  };

  if (tabs && window.MENU) {
    tabs.innerHTML = window.MENU.map((c) =>
      `<button class="tab${c.seasonal ? " tab--seasonal" : ""}" role="tab" data-id="${c.id}" aria-controls="menuGrid">${esc(c.label)}<small>${c.items.length}</small></button>`
    ).join("");
    tabs.addEventListener("click", (e) => { const b = e.target.closest(".tab"); if (b) show(b.dataset.id); });
    tabs.addEventListener("keydown", (e) => {
      if (!["ArrowRight", "ArrowLeft"].includes(e.key)) return;
      const list = $$(".tab", tabs), i = list.indexOf(document.activeElement);
      const n = list[(i + (e.key === "ArrowRight" ? 1 : -1) + list.length) % list.length];
      n.focus(); show(n.dataset.id);
    });
    let start = window.MENU[0].id;
    try { const s = localStorage.getItem("tpj-tab"); if (s && window.MENU.some((c) => c.id === s)) start = s; } catch (_) {}
    show(start);
  }

  /* ---------- videos: play when visible, sound toggles ---------- */
  const vids = $$("video");
  const vidIO = new IntersectionObserver((entries) => entries.forEach((e) => {
    const v = e.target;
    if (e.isIntersecting) { if (!reduceMotion || v.id === "heroVideo") v.play().catch(() => {}); }
    else v.pause();
  }), { threshold: 0.35 });
  vids.forEach((v) => vidIO.observe(v));

  const setSound = (v, on) => {
    if (on) vids.forEach((o) => { if (o !== v) { o.muted = true; syncBtn(o); } });
    v.muted = !on;
    if (on) v.play().catch(() => {});
    syncBtn(v);
  };
  const syncBtn = (v) => {
    const b = $(`.sound[data-target="${v.id}"]`);
    if (!b) return;
    b.classList.toggle("is-on", !v.muted);
    b.setAttribute("aria-label", v.muted ? "Unmute video" : "Mute video");
  };
  $$(".sound").forEach((b) => b.addEventListener("click", (e) => {
    e.preventDefault();
    const v = document.getElementById(b.dataset.target);
    setSound(v, v.muted);
  }));
  // tapping a reel frame toggles sound too
  $$(".reel__frame video").forEach((v) => v.addEventListener("click", () => setSound(v, v.muted)));

  /* ---------- contact form (FormSubmit AJAX) ---------- */
  const form = $("#contactForm"), status = $("#formStatus");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      status.className = "form__status";
      const fields = $$("[required]", form);
      let bad = null;
      fields.forEach((f) => {
        const invalid = !f.value.trim() || (f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value));
        f.classList.toggle("is-invalid", invalid);
        if (invalid && !bad) bad = f;
      });
      if (bad) { status.textContent = "Please fill in your name, a valid email and a message."; status.classList.add("is-error"); bad.focus(); return; }
      if (form._honey.value) return;

      const btn = $("button[type=submit]", form);
      btn.disabled = true; btn.textContent = "Sending…";
      try {
        const data = Object.fromEntries(new FormData(form));
        data._replyto = data.email;
        const res = await fetch("https://formsubmit.co/ajax/theproteinjungle@gmail.com", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data)
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok || json.success === "false" || json.success === false) throw new Error(json.message || "Send failed");
        form.reset();
        status.textContent = "Thanks! Your message is on its way — we'll be in touch soon. 🦍";
        status.classList.add("is-ok");
      } catch (err) {
        status.innerHTML = 'Sorry, that didn\'t go through. Please call <a href="tel:+15302097631">(530) 209-7631</a> or email <a href="mailto:theproteinjungle@gmail.com">theproteinjungle@gmail.com</a>.';
        status.classList.add("is-error");
      } finally {
        btn.disabled = false; btn.textContent = "Send Message";
      }
    });
    $$("input, textarea", form).forEach((f) => f.addEventListener("input", () => f.classList.remove("is-invalid")));
  }

  const y = $("#year"); if (y) y.textContent = new Date().getFullYear();
})();
