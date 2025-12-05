document.addEventListener("DOMContentLoaded", () => {
    // Load saved theme
    const saved = localStorage.getItem("wagtail-theme") || "dark";
    document.documentElement.setAttribute("data-theme", saved);

    // Create toggle button
    const btn = document.createElement("button");
    btn.id = "theme-toggle-btn";
    btn.innerText = saved === "light" ? "🌞 Light" : "🌚 Dark";

    // Button styles
    Object.assign(btn.style, {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "10px 15px",
        fontSize: "14px",
        background: "#444",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        zIndex: 999999
    });

    document.body.appendChild(btn);

    // Toggle theme
    btn.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme");
        const next = current === "light" ? "dark" : "light";

        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("wagtail-theme", next);

        btn.innerText = next === "light" ? "🌞 Light" : "🌚 Dark";
    });
});
