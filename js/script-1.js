
    (function () {
      var sec = document.getElementById("reviews"); if (!sec) return;
      var items = sec.querySelectorAll(".rv-rv, .rv-bub"), cards = sec.querySelectorAll(".rv-card");
      cards.forEach(function (k, i) { k.style.setProperty("--d", (i * 90) + "ms"); });
      if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); if (e.target.classList.contains("rv-card") || e.target === sec) sec.classList.add("go"); io.unobserve(e.target); } }); }, { threshold: .12 });
        items.forEach(function (x) { io.observe(x); }); io.observe(sec.querySelector(".rvw-track"));
        var io2 = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { sec.classList.add("go"); io2.disconnect(); } }); }, { threshold: .1 });
        io2.observe(sec.querySelector(".rvw-track"));
      } else { items.forEach(function (x) { x.classList.add("in"); }); sec.classList.add("go"); }
      var tr = document.getElementById("rvTrack"), prev = document.getElementById("rvPrev"), next = document.getElementById("rvNext"), pg = document.getElementById("rvProg");
      function upd() {
        var max = tr.scrollWidth - tr.clientWidth;
        prev.disabled = tr.scrollLeft < 4; next.disabled = tr.scrollLeft > max - 4;
        var w = tr.clientWidth / Math.max(tr.scrollWidth, 1) * 100;
        pg.style.width = Math.max(w, 12) + "%"; pg.style.marginLeft = (max > 0 ? tr.scrollLeft / max * (100 - Math.max(w, 12)) : 0) + "%";
      }
      function step(d) { var k = tr.querySelector(".rv-card:not([hidden])"); tr.scrollBy({ left: d * ((k ? k.offsetWidth : 380) + 22), behavior: "smooth" }); }
      prev.addEventListener("click", function () { step(-1); }); next.addEventListener("click", function () { step(1); });
      tr.addEventListener("scroll", upd, { passive: true }); window.addEventListener("resize", upd); setTimeout(upd, 400);
      var chips = sec.querySelectorAll(".rvw-chips button");
      chips.forEach(function (c) { c.addEventListener("click", function () {
        chips.forEach(function (x) { x.classList.remove("on"); }); c.classList.add("on");
        var f = c.getAttribute("data-f");
        cards.forEach(function (k) {
          var show = f === "all" || k.getAttribute("data-l") === f;
          if (show) { k.hidden = false; k.style.display = ""; void k.offsetWidth; k.classList.remove("off"); }
          else { k.classList.add("off"); setTimeout(function () { if (k.classList.contains("off")) k.style.display = "none"; }, 280); }
        });
        tr.scrollTo({ left: 0, behavior: "smooth" }); setTimeout(upd, 340);
      }); });
      sec.querySelectorAll(".rv-more").forEach(function (b) { b.addEventListener("click", function () { b.closest(".rv-card").classList.toggle("open"); }); });
    })();
    