// Theme toggle (the initial theme is set in the <head> to avoid a flash)
(function () {
  var btn = document.getElementById("theme");
  var root = document.documentElement;
  function label() {
    btn.setAttribute("aria-label", root.dataset.theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
  }
  btn.addEventListener("click", function () {
    var next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
    label();
  });
  label();
})();

// Filter buttons on Writing and Media & Talks
document.querySelectorAll(".filters[data-filter]").forEach(function (bar) {
  var list = document.getElementById(bar.dataset.filter);
  if (!list) return;
  bar.hidden = false;
  bar.addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (!b) return;
    var v = b.dataset.v;
    bar.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
    var shown = 0;
    list.querySelectorAll(".row").forEach(function (row) {
      var match = v === "All" || row.dataset.v.split("|").indexOf(v) !== -1;
      row.hidden = !match;
      if (match) shown++;
    });
    list.querySelectorAll(".group").forEach(function (g) { g.hidden = !g.querySelector(".row:not([hidden])"); });
    var empty = list.querySelector(".empty");
    if (empty) empty.hidden = shown > 0;
  });
});

// Reading progress on posts: bar under the header, contents list, minutes left
(function () {
  var essay = document.getElementById("essay");
  if (!essay) return;
  var bar = document.getElementById("readbar");
  var left = document.getElementById("left");
  var minutes = Number(essay.dataset.minutes) || 1;
  var heads = Array.prototype.slice.call(essay.querySelectorAll("h2[id]"));
  var items = Array.prototype.slice.call(document.querySelectorAll(".toc li"));
  var ticking = false;

  function update() {
    ticking = false;
    var top = essay.getBoundingClientRect().top + scrollY;
    var end = top + essay.offsetHeight;
    var total = Math.min(1, Math.max(0, (scrollY + innerHeight - top) / (end - top)));
    bar.style.transform = "scaleX(" + total + ")";
    if (left) left.textContent = total >= 1 ? "Finished" : Math.ceil(minutes * (1 - total)) + " min left";
    var y = scrollY + innerHeight * 0.35;
    heads.forEach(function (h, i) {
      if (!items[i]) return;
      var s = h.getBoundingClientRect().top + scrollY;
      var e = heads[i + 1] ? heads[i + 1].getBoundingClientRect().top + scrollY : end;
      var p = Math.min(1, Math.max(0, (y - s) / (e - s)));
      items[i].querySelector(".fill").style.transform = "scaleX(" + p + ")";
      items[i].classList.toggle("done", p >= 1);
      items[i].classList.toggle("cur", p > 0 && p < 1);
    });
  }
  addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  addEventListener("resize", update);
  update();
})();
