document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('theme-toggle-btn')) return;

    const btn = document.createElement('div');
    btn.id = 'theme-toggle-btn';
    btn.innerHTML = '🌗';
    btn.title = "Switch Theme";

    const brandingArea = document.querySelector('.sidebar-branding');
    if (brandingArea) {
        brandingArea.appendChild(btn);
    } else {
        document.body.appendChild(btn);
    }

    function applyTheme(isDark) {
        if (isDark) {
            document.body.classList.add('dark-theme');
            btn.style.backgroundColor = 'rgba(255,255,255,0.2)';
        } else {
            document.body.classList.remove('dark-theme');
            btn.style.backgroundColor = '#222';
        }
    }

    const savedTheme = localStorage.getItem('wagtail-custom-theme');
    const isDark = savedTheme === 'dark';
    applyTheme(isDark);

    btn.addEventListener('click', function () {
        const currentlyDark = document.body.classList.contains('dark-theme');
        const newIsDark = !currentlyDark;

        applyTheme(newIsDark);
        localStorage.setItem('wagtail-custom-theme', newIsDark ? 'dark' : 'light');
    });
});