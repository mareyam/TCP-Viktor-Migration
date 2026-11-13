window.GS_BASE="https://confident-mastiff-102.convex.site";
// Get Started page controller. Ported from WP page 3966 (CF7 form 3965).
// Sign-up details go to this app's Convex route /signup, which forwards them to
// the n8n sign-up webhook (same payload as the WP page). Then the user goes to Stripe.
(function () {
  // TEMPORARY (Maryam 2026-10-29): no payment step. Form saves, then shows a thank-you
  // (TCP Monitor creates the account + emails the login). Set false to bring Stripe back.
  var SKIP_PAYMENT = false;
  var LINKS = { watch: "https://buy.stripe.com/test_14A9ALcGu8qubFPcyC9IQ00", enforce: "https://buy.stripe.com/test_5kQ00bbCq0Y25hrbuy9IQ01" };
  var PLANS = {
    watch: { n: "Watch", p: "$149", f: ["Online monitoring across marketplaces, social and domains", "Weekly threat report in plain English", "Immediate alerts for urgent threats", "Image & copyright content monitoring", "Ready-to-use enforcement templates"] },
    enforce: { n: "Watch + Enforce", p: "$199", f: ["Everything in Watch", "We draft the enforcement letter or takedown", "We find the infringer's contact details", "We submit on your behalf, with your approval", "Follow-up tracking until resolved"] },
  };
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function track(name, params) { params = params || {}; params.page = "get-started"; try { window.dataLayer = window.dataLayer || []; window.dataLayer.push(Object.assign({ event: name }, params)); } catch (e) {} try { if (typeof window.gtag === "function") window.gtag("event", name, params); } catch (e) {} }
  function key(v) { return /enforce/i.test(v || "") ? "enforce" : "watch"; }
  function render(k) {
    var P = PLANS[k];
    $("#gs-pn").textContent = P.n; $("#gs-pp").textContent = P.p;
    $("#gs-feat").innerHTML = P.f.map(function (x) { return "<li>" + x + "</li>"; }).join("");
    $$("#gsp .gs-plans .wpcf7-list-item label").forEach(function (l) { var i = l.querySelector("input"); l.classList.toggle("on", !!(i && i.checked)); });
    if (window.gsSyncFreq) window.gsSyncFreq();
  }

  function init() {
    var root = document.getElementById("gsp");
    if (!root || root.dataset.ready) return;
    root.dataset.ready = "1";
    var form = $("#gsp form"), busy = false, btn = $('#gsp input[type="submit"]');
    if (SKIP_PAYMENT) { // hide payment wording while checkout is off
      $$("#gsp .gs-secure").forEach(function (e) { e.style.display = "none"; });
      var st = $$("#gsp .steps span"); if (st[1]) st[1].innerHTML = "<b>2</b>Account created";
      var li = $("#gsp .top p.l"); if (li) li.textContent = "Tell us what to monitor. It takes about two minutes.";
      if (btn) btn.value = "Submit →"; }

    $$("#gsp .gs-plans:not(.gs-freq) .wpcf7-list-item").forEach(function (li) { var i = li.querySelector("input"), t = li.querySelector(".wpcf7-list-item-label"); if (!i || !t) return; var k = key(i.value); t.innerHTML = PLANS[k].n + '<span class="pp"><b>' + PLANS[k].p + "</b> per trademark / month</span>"; });
    var q = new URLSearchParams(location.search).get("plan");
    if (q) { var want = key(q); $$('#gsp input[name="plan"]').forEach(function (i) { i.checked = key(i.value) === want; }); }
    var cur = $('#gsp input[name="plan"]:checked'); render(key(cur && cur.value));
    $$('#gsp input[name="plan"]').forEach(function (i) { i.addEventListener("change", function () { render(key(i.value)); }); });
    $$("#gsp .gs-chk input").forEach(function (i) { i.addEventListener("change", function () { i.closest("label").classList.toggle("on", i.checked); }); });

    // what to protect + logo upload
    var box = document.getElementById("gs-logo"), fi = box && box.querySelector("input[type=file]"), drop = box && box.querySelector(".gs-drop"), err = document.getElementById("gs-logo-err"), dt = drop && drop.querySelector(".gs-drop-t");
    var MAX = 5 * 1024 * 1024, OK = /\.(png|jpe?g|svg|webp)$/i;
    function monOn() { var c = document.getElementById("gs-sc-monitor"); return !c || c.checked; }
    function needLogo() { if (!monOn()) return false; var r = $('#gsp input[name="protect"]:checked'); return !!(r && /logo/i.test(r.value)); }
    function syncProtect() { $$("#gsp .gs-protect .wpcf7-list-item label").forEach(function (l) { var i = l.querySelector("input"); l.classList.toggle("on", !!(i && i.checked)); }); if (box) box.classList.toggle("show", needLogo()); }
    $$('#gsp input[name="protect"]').forEach(function (i) { i.addEventListener("change", function () { syncProtect(); if (err) err.textContent = ""; clearErr(i); }); });
    syncProtect();
    function logoErr() { if (!needLogo()) return ""; var f = fi && fi.files && fi.files[0]; if (!f) return 'Please upload your logo, or choose "Words" if you only want the name protected.'; if (!OK.test(f.name)) return "Please use a PNG, JPG, SVG or WebP file."; if (f.size > MAX) return "That file is over 5 MB. Please upload a smaller version."; return ""; }
    if (fi) {
      fi.addEventListener("change", function () {
        var f = fi.files && fi.files[0]; err.textContent = logoErr(); var old = drop.querySelector("img"); if (old) old.remove(); drop.classList.toggle("has", !!f);
        if (f) { dt.innerHTML = "<b>" + f.name.replace(/[<>&]/g, "") + "</b> · change"; if (/^image\//.test(f.type) && f.size < MAX) { var im = document.createElement("img"); im.alt = "Logo preview"; im.src = URL.createObjectURL(f); drop.insertBefore(im, drop.firstChild); } }
        else { dt.innerHTML = "<b>Choose a logo file</b> or drag it here"; }
      });
      ["dragenter", "dragover"].forEach(function (e) { drop.addEventListener(e, function () { drop.classList.add("drag"); }); });
      ["dragleave", "drop"].forEach(function (e) { drop.addEventListener(e, function () { drop.classList.remove("drag"); }); });
    }


    // ---- step 2: scanner checks (markup: src/getstarted/scanMarkup.ts) ----
    // Nothing is searched here. Choices + photos go to TCP Monitor (/lens/signup-scan)
    // and run once after payment; results show in the client's dashboard.
    var sc = document.querySelector("#gsp .gs-scan"), grp = "saas";
    function radioOn(id) { var c = document.getElementById("gs-sc-" + id); return !!(c && c.checked); }
        // Face and brand/content are separate options again (Maryam 2026-10-28 later).
    function scOn(id) { return radioOn(id); }
    function scErr(id, m) { var e = document.getElementById("gs-sc-err-" + id); if (e) e.textContent = m || ""; }
    function byId(id) { return document.getElementById(id); }
    function val(id) { var e = byId(id); return e ? String(e.value || "").trim() : ""; }
    function t3panel() { return sc.querySelector('.t3-g[data-g="' + grp + '"]'); }
    function preview(d, f) { if (!d) return; var o = d.querySelector("img.gs-prev"); if (o) o.remove(); d.classList.toggle("has-img", !!f); if (f) { var im = document.createElement("img"); im.className = "gs-prev"; im.alt = "Your photo"; im.src = URL.createObjectURL(f); d.insertBefore(im, d.firstChild); } var ph = d.querySelector("strong"); if (ph) ph.textContent = f ? "Click to change the photo" : (d.id === "tf-drop" ? "Click or drop your face photo here" : "Click or drop a photo here"); }
    function dropZone(dId, fId) { var d = byId(dId), f = byId(fId); if (!d || !f) return;
      f.addEventListener("change", function () { preview(d, f.files[0]); scErr(dId === "tl-drop" ? "sellers" : "fakes", ""); });
      d.addEventListener("dragover", function (e) { e.preventDefault(); d.classList.add("tl-over"); });
      d.addEventListener("dragleave", function () { d.classList.remove("tl-over"); });
      d.addEventListener("drop", function (e) { e.preventDefault(); d.classList.remove("tl-over"); var x = e.dataTransfer && e.dataTransfer.files[0]; if (!x) return; try { var dt = new DataTransfer(); dt.items.add(x); f.files = dt.files; } catch (er) {} preview(d, x); }); }
    if (sc) {
      // One option only (radio buttons, Maryam 2026-10-23): open the chosen one, close the rest.
      $$(".gs-sc-opt", sc).forEach(function (o) { var c = o.querySelector(".gs-sc-head input"); c.addEventListener("change", function () { $$(".gs-sc-opt", sc).forEach(function (x) { var xi = x.querySelector(".gs-sc-head input"); x.classList.toggle("on", !!(xi && xi.checked)); scErr(x.getAttribute("data-s"), ""); }); scErr("any", ""); syncProtect(); }); });
      dropZone("tl-drop", "tl-file"); dropZone("tf-drop", "tf-file");
      $$('input[name="tl-mode"]', sc).forEach(function (r) { r.addEventListener("change", function () { $$(".tl-opt", sc).forEach(function (l) { var i = l.querySelector("input"); l.classList.toggle("tl-on", !!(i && i.checked)); }); }); });
      var ps = byId("tl-s-photo"); if (ps) ps.addEventListener("change", function () { byId("tl-photo-opts").style.display = ps.checked ? "" : "none"; });
      var bi = byId("tl-brand"); if (bi) bi.placeholder = "Brand name (empty = the brand name you type below)";
      var none = byId("tf-none"); if (none) none.addEventListener("change", function () { byId("tf-handles").disabled = none.checked; });
      $$("#t3-who .tl-chip", sc).forEach(function (b) { b.addEventListener("click", function () { grp = b.getAttribute("data-g");
        $$("#t3-who .tl-chip", sc).forEach(function (x) { x.classList.toggle("tl-on", x === b); });
        $$(".t3-g", sc).forEach(function (g) { g.style.display = g.getAttribute("data-g") === grp ? "" : "none"; }); scErr("checks", ""); }); });
      sc.addEventListener("change", function (e) { var t = e.target; if (!t.classList) return;
        if (t.classList.contains("t3-textbox") || t.classList.contains("t3-langbox")) { var o = t.closest("label").nextElementSibling; if (o) o.style.display = t.checked ? (t.classList.contains("t3-langbox") ? "flex" : "block") : "none"; }
        if (t.classList.contains("t3c")) scErr("checks", ""); });
    }
    function mainName() { return grp === "book" || grp === "course" || grp === "pod" ? val("t3-" + grp + "-title") : grp === "music" ? val("t3-music-artist") : val("t3-" + grp + "-name"); }
    function ticks() { var a = []; $$(".t3c:checked", t3panel()).forEach(function (c) { var k = c.getAttribute("data-k"); if (a.indexOf(k) < 0) a.push(k); }); return a; }
    function sellersBrand() { return val("tl-brand") || (monOn() ? (($('#gsp input[name="mark-name"]') || {}).value || "").trim() : "") || (($('#gsp input[name="business-name"]') || {}).value || "").trim(); }
    function sources() { return $$(".tl-src:checked", sc).map(function (c) { return c.value; }); }
    function sentences() { var o = t3panel().querySelector(".t3-own"); return o ? o.value.split(/\n/).map(function (x) { return x.trim(); }).filter(function (x) { return x.length >= 20; }).slice(0, 5) : []; }
    function scanErrors() { if (!sc) return null; var first = null;
      function bad(id, m) { scErr(id, m); if (!first) first = byId("gs-sc-err-" + id); }
      ["any", "sellers", "fakes", "checks"].forEach(function (id) { scErr(id, ""); });
      if (!["monitor", "sellers", "fakes", "checks"].some(radioOn)) bad("any", "Please pick one option.");
      if (scOn("sellers")) { var ph = byId("tl-s-photo").checked, f = byId("tl-file").files[0], src = sources();
        if (ph && !f) bad("sellers", "Please upload a product photo, or untick Photo search.");
        else if (!ph && !src.length) bad("sellers", "Please tick Photo search or at least one brand name check.");
        else if (src.length && sellersBrand().length < 2) bad("sellers", "Please type the brand name to search."); }
      if (scOn("fakes")) { if (!byId("tf-file").files[0]) bad("fakes", "Please upload a photo of your face.");
        else if (faceJob && faceJob.state === "noface") bad("fakes", "We could not find a face in this photo. Please upload a clear photo where the face is easy to see.");
        else if (!byId("tf-none").checked && val("tf-handles").length < 2) bad("fakes", "Please list your own accounts, or tick \"I have no social media accounts\"."); }
      if (scOn("checks")) { var t = ticks();
        if (grp === "photo") { if (!byId("t3-photo-file").files[0]) bad("checks", "Please upload your photo."); else if (!t.length) bad("checks", "Please tick what to check."); }
        else if (mainName().length < 2) bad("checks", "Please fill in the name box at the top.");
        else if (!t.length) bad("checks", "Please tick at least one check.");
        else if (t.indexOf("text") >= 0 && !sentences().length) bad("checks", "Please paste at least one sentence (20+ characters), or untick the text check.");
        else if (t.indexOf("translate") >= 0 && !$$(".t3l:checked", t3panel()).length) bad("checks", "Please pick at least one language, or untick translations."); }
      return first; }
    // Same photo sizes as the scanner page (public/lens.js), so the searches give the same results.
    function imgData(f, max, maxBytes) { max = max || 1200; maxBytes = maxBytes || 1.5e6; return new Promise(function (res) { if (!f) return res(null);
      var done = function (b) { var r = new FileReader(); r.onload = function () { var s = String(r.result); res({ type: b.type || "image/jpeg", data: s.slice(s.indexOf(",") + 1) }); }; r.onerror = function () { res(null); }; r.readAsDataURL(b); };
      if (max === Infinity) return done(f);
      var im = new Image(); im.onload = function () { var w = im.width, h = im.height; if (w <= max && h <= max && f.size < maxBytes) return done(f);
        var k = Math.min(1, max / Math.max(w, h)), c = document.createElement("canvas"); c.width = Math.round(w * k); c.height = Math.round(h * k); c.getContext("2d").drawImage(im, 0, 0, c.width, c.height); c.toBlob(function (b) { done(b || f); }, "image/jpeg", 0.9); };
      im.onerror = function () { done(f); }; im.src = URL.createObjectURL(f); }); }
    // "Find fakes of me": like the scanner, search only the face (cropped), keep the full photo for face matching.
    var FA = "https://cdn.jsdelivr.net/npm/@vladmandic/face-api@1.7.15/", faReady = null, faceJob = null;
    function loadFA() { if (faReady) return faReady; faReady = new Promise(function (res, rej) { if (window.faceapi) return res(); var s = document.createElement("script"); s.src = FA + "dist/face-api.js"; s.onload = res; s.onerror = function () { faReady = null; rej(new Error("load")); }; document.head.appendChild(s); })
      .then(function () { var tf = faceapi.tf; return Promise.resolve(tf.setBackend("webgl")).catch(function () { return false; }).then(function (ok) { return ok || tf.setBackend("cpu"); }).then(function () { return tf.ready(); }); })
      .then(function () { return faceapi.nets.tinyFaceDetector.isLoaded ? 0 : faceapi.nets.tinyFaceDetector.loadFromUri(FA + "model"); }); return faReady; }
    function faceCrop(f) { return loadFA().then(function () { return new Promise(function (res, rej) { var img = new Image(); img.onload = function () {
      faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions({ inputSize: 512, scoreThreshold: 0.4 })).then(function (ds) { if (!ds.length) return res(null);
        var b = ds.sort(function (a, c) { return c.box.area - a.box.area; })[0].box;
        var x0 = Math.max(0, b.x - b.width * 0.35), x1 = Math.min(img.width, b.x + b.width * 1.35), y0 = Math.max(0, b.y - b.height * 0.45), y1 = Math.min(img.height, b.y + b.height * 1.0);
        var w = x1 - x0, h = y1 - y0, k = Math.min(1, 900 / Math.max(w, h)), c = document.createElement("canvas"); c.width = Math.round(w * k); c.height = Math.round(h * k);
        c.getContext("2d").drawImage(img, x0, y0, w, h, 0, 0, c.width, c.height); c.toBlob(function (bl) { res(bl); }, "image/jpeg", 0.92); }).catch(rej); };
      img.onerror = function () { rej(new Error("img")); }; img.src = URL.createObjectURL(f); }); }); }
    // faceJob.state: "busy" | "ok" | "noface" | "fail"
    function startFace() { var f = byId("tf-file") && byId("tf-file").files[0]; if (!f) { faceJob = null; return; }
      var job = { state: "busy", blob: null }; faceJob = job;
      job.p = faceCrop(f).then(function (b) { job.blob = b; job.state = b ? "ok" : "noface"; if (!b) scErr("fakes", "We could not find a face in this photo. Please upload a clear photo where the face is easy to see."); })
        .catch(function () { job.state = "fail"; }); }
    if (byId("tf-file")) byId("tf-file").addEventListener("change", startFace);
    function collectScan(base) { if (!sc || !(scOn("sellers") || scOn("fakes") || scOn("checks"))) return Promise.resolve(null);
      var req = { email: base.email, name: (base.first_name + " " + base.last_name).trim(), business: base.business_name, brand: base.mark_name, website: base.website, plan: base.plan }, waits = [];
      if (scOn("sellers")) { var ph = byId("tl-s-photo").checked; req.sellers = { photo: ph, mode: (($('#gsp input[name="tl-mode"]:checked') || {}).value) || "all", allSites: byId("tl-all").checked, brand: sellersBrand(), site: val("tl-site") || base.website, sources: sources() };
        if (ph) waits.push(imgData(byId("tl-file").files[0]).then(function (i) { req.sellers.image = i; })); }
      if (scOn("fakes")) { req.fakes = { none: byId("tf-none").checked, handles: val("tf-handles") }; var full = byId("tf-file").files[0], fj = faceJob;
        waits.push((fj && fj.p ? fj.p : Promise.resolve()).then(function () { return imgData(fj && fj.blob ? fj.blob : full, 1200, 1.5e6); }).then(function (i) { req.fakes.image = i; }));
        waits.push(imgData(full, 1600, 2e6).then(function (i) { req.fakes.ref = i; })); }
      if (scOn("checks")) { var p = t3panel(), fields = {};
        $$("input.tl-in, textarea.tl-ta", p).forEach(function (e) { var m = (e.id || "").match(/^t3-[a-z]+-(\w+)$/); if (m && e.value.trim()) fields[m[1]] = e.value.trim(); });
        req.checks = { group: grp, fields: fields, ticks: ticks(), sentences: sentences(), langs: $$(".t3l:checked", p).map(function (c) { return c.value; }) };
        if (grp === "photo") { var pf = byId("t3-photo-file").files[0]; waits.push(imgData(pf, pf && pf.size <= 7e6 ? Infinity : 2400, 7e6).then(function (i) { req.checks.image = i; })); } }
      return Promise.all(waits).then(function () { return req; }); }

    // how often we search (display-only price; Maryam 2026-10-28)
    function syncFreq() {
      var c = $('#gsp input[name="scan-frequency"]:checked');
      $$('#gsp .gs-freq .wpcf7-list-item label').forEach(function (l) { var i = l.querySelector("input"); l.classList.toggle("on", !!(i && i.checked)); });
      if (!c) return; var lab = c.closest("label"), name = lab.querySelector(".wpcf7-list-item-label").firstChild.textContent;
      if (!c) return;
      // Maryam 2026-10-28 (v2): options show only "+$X" (not combined); the combined total appears ONLY on the payment button. Display only; Stripe still charges the plan.
      var pl = $('#gsp input[name="plan"]:checked'), P0 = PLANS[key(pl && pl.value)], base = parseInt(P0.p.replace(/\D/g, ""), 10);
      var add = +c.getAttribute("data-add") || 0, total = "$" + (base + add);
      var n = byId("gs-fq-n"), p = byId("gs-fq-p"), note = byId("gs-fq-note");
      if (n) n.textContent = name; if (p) p.textContent = add ? "+$" + add : "Included";
      if (note) note.style.display = "none";
      var pp = byId("gs-pp"); if (pp) pp.textContent = P0.p;
      if (btn && !busy) btn.value = SKIP_PAYMENT ? "Submit →" : "Continue to secure payment · " + total + "/month →";
    }
    window.gsSyncFreq = syncFreq;
    $$('#gsp input[name="scan-frequency"]').forEach(function (i) { i.addEventListener("change", syncFreq); });
    syncFreq();

    // validation (replaces Contact Form 7's checks)
    function wrapOf(el) { return el.closest(".wpcf7-form-control-wrap") || el.parentNode; }
    function clearErr(el) { var w = wrapOf(el), e = w.querySelector(".gs-err"); if (e) e.remove(); }
    function setErr(el, msg) { clearErr(el); var s = document.createElement("span"); s.className = "gs-err"; s.textContent = msg; wrapOf(el).appendChild(s); }
    $$("#gsp input, #gsp select, #gsp textarea").forEach(function (el) { el.addEventListener("input", function () { clearErr(el); }); el.addEventListener("change", function () { clearErr(el); }); });
    function validate() {
      var first = null;
      $$("#gsp .gs-err").forEach(function (e) { e.remove(); });
      function bad(el, msg) { setErr(el, msg); if (!first) first = el; }
      $$("#gsp .wpcf7-validates-as-required").forEach(function (el) { if (el.closest(".gs-sc-opt:not(.on)")) return; if (el.matches("input,select,textarea") && !String(el.value || "").trim()) bad(el, "Please fill out this field."); });
      var em = $('#gsp input[name="your-email"]'); if (em.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.value.trim())) bad(em, "Please enter a valid email address.");
      var web = $('#gsp input[name="website"]'); if (web && monOn() && web.value.trim() && !/^(https?:\/\/)?[^\s.]+\.[^\s]+$/i.test(web.value.trim())) bad(web, "Please enter a valid website, e.g. https://yourbrand.com");
      var ph = $('#gsp input[name="phone"]'); if (ph.value.trim() && !/^[+()\-.\s\d]{6,}$/.test(ph.value.trim())) bad(ph, "Please enter a valid phone number.");
      var pr = $('#gsp input[name="protect"]'); if (pr && monOn() && !$('#gsp input[name="protect"]:checked')) bad(pr, "Please choose what we should protect.");
      var t = $('#gsp input[name="terms"]'); if (!t.checked) bad(t, "Please accept to continue.");
      var lm = logoErr(); if (lm) { err.textContent = lm; if (!first) first = box; }
      var se = scanErrors(); if (se && !first) first = se;
      if (first) (first.closest("label") || first).scrollIntoView({ behavior: "smooth", block: "center" });
      return !first;
    }

    function readLogo() { return new Promise(function (res) { var f = needLogo() && fi && fi.files && fi.files[0]; if (!f) return res(null); var r = new FileReader(); r.onload = function () { var s = String(r.result); res({ name: f.name, type: f.type || (/\.svg$/i.test(f.name) ? "image/svg+xml" : "image/png"), data: s.slice(s.indexOf(",") + 1) }); }; r.onerror = function () { res(null); }; r.readAsDataURL(f); }); }
    function showMsg(m) { var b = document.getElementById("gs-msg"); b.textContent = m; b.style.display = m ? "block" : "none"; }


    form.addEventListener("submit", function (ev) {
      ev.preventDefault(); showMsg("");
      if (busy) return;
      if ($('#gsp input[name="hp_check"]').value) return; // bot trap
      if (!validate()) { showMsg("Some fields need your attention. Please check the form and try again."); return; }
      busy = true; btn.disabled = true; btn.value = "Saving your details…";
      var fd = new FormData(form), g = function (n) { return (fd.get(n) || "").toString().trim(); };
      var data = { plan: g("plan"), first_name: g("first-name"), last_name: g("last-name"), email: g("your-email"), phone: g("phone"), business_name: g("business-name"), website: g("website"), mark_name: g("mark-name"), protect: g("protect"), mark_count: g("mark-count"), mark_number: g("mark-number"), channels: fd.getAll("channels[]").map(String), concern: g("concern"), copyrights: g("copyrights"), notes: g("notes"), referral: g("referral") };
      if (!monOn()) { data.business_name = ""; data.website = ""; data.mark_name = sellersBrand(); data.protect = ""; data.mark_count = "1"; data.mark_number = ""; data.channels = []; data.concern = ""; data.copyrights = ""; }
      data.scan_choices = ["monitor", "sellers", "fakes", "checks"].filter(scOn).join(", ");
      data.scan_frequency = g("scan-frequency") || ""; // step hidden 2026-10-28 → empty = old behaviour (no frequency)
      var k = key(data.plan), url = LINKS[k] + "?prefilled_email=" + encodeURIComponent(data.email);
      track("signup_submitted", { plan: k, mark_count: data.mark_count });
      Promise.all([readLogo(), collectScan(data)]).then(function (got) {
        var l = got[0], scan = got[1];
        if (l) data.logo = l;
        if (scan) track("signup_scan_chosen", { sellers: !!scan.sellers, fakes: !!scan.fakes, checks: scan.checks ? scan.checks.group : "" });
        if (SKIP_PAYMENT) {
          var rd = document.getElementById("gs-redir");
          rd.querySelector("h3").textContent = "Thanks! You're all set.";
          rd.querySelector("p").textContent = "We're creating your account now. Check your email in a few minutes for your login and dashboard link.";
          document.getElementById("gs-redir-link").style.display = "none";
          url = null;
        } else document.getElementById("gs-redir-link").href = url;
        $("#gs-form-slot").style.display = "none"; document.getElementById("gs-redir").style.display = "block";
        window.scrollTo({ top: root.offsetTop, behavior: "smooth" });
        var done = false, left = scan ? 2 : 1, go = function () { if (!done && url) { done = true; setTimeout(function () { window.location.href = url; }, 600); } }, one = function () { left--; if (left <= 0) go(); };
        var c = "AbortController" in window ? new AbortController() : null; setTimeout(function () { if (c) c.abort(); }, 25000);
        fetch((window.GS_BASE || "") + "/signup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data), signal: c && c.signal }).then(one, one);
        if (scan) fetch((window.GS_BASE || "") + "/lens/signup-scan", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(scan), signal: c && c.signal }).then(one, one);
        setTimeout(go, 26000);
      });
    });
  }
  window.gsInit = init;
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
