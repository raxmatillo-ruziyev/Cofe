const items = document.querySelectorAll("[data-reveal]");
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduce || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
} else {
    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                el.style.animationDelay = (el.dataset.delay || 0) + "ms";
                el.classList.add("is-visible");
                io.unobserve(el);
            });
        },
        { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    items.forEach((el) => io.observe(el));
}

/* plan builder: buyurtma xulosasi */
const builder = document.getElementById("builder");
if (builder) {
    const update = () => {
        new FormData(builder).forEach((value, key) => {
            const out = document.querySelector('[data-out="' + key + '"]');
            if (out) out.textContent = value;
        });
    };
    builder.addEventListener("change", update);
    update();
    document.getElementById("createPlan").addEventListener("click", () => {
        document.getElementById("planDone").hidden = false;
    });
}