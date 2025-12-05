document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Prevent duplicates
    if (document.getElementById('theme-toggle-btn')) return;

    // --- FORCE CSS INJECTION (Updated for Logo & Search Bar) ---
    const style = document.createElement('style');
    style.innerHTML = `
        /* LIGHT THEME VARIABLES (Override Wagtail Defaults) */
        body.light-theme {
            --w-color-surface-menus: #ffffff;
            --w-color-surface-menus-text: #000000;
            --w-color-text-label-menus-default: #000000;
            --w-color-surface-menu-item-active: #e6f7ff;
        }

        /* 1. MAIN BACKGROUNDS */
        body.light-theme, 
        body.light-theme .content-wrapper, 
        body.light-theme .main-content, 
        body.light-theme main, 
        body.light-theme .wrapper,
        body.light-theme #main,
        body.light-theme .content {
            background-color: #f3f3f3 !important;
            color: #222222 !important;
        }

        /* 2. HEADER FIXES */
        body.light-theme header, 
        body.light-theme .w-header,
        body.light-theme .row.header {
            background-color: #ffffff !important;
            border-bottom: 1px solid #000000 !important; /* Black border */
        }
        
        body.light-theme h1, 
        body.light-theme h2, 
        body.light-theme .left,
        body.light-theme .col12,
        body.light-theme .w-header__title {
            color: #222222 !important;
            text-shadow: none !important;
        }

        /* --- SEARCH BAR (Little Light White) --- */
        body.light-theme header input,
        body.light-theme .w-header input,
        body.light-theme input[type="text"] {
            background-color: #ffffffff !important; /* Light White */
            color: #333333 !important;
            border: 1px solid #ffffffff !important;
            box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);
        }
        body.light-theme header input::placeholder {
            color: #ffffffff !important;
        }

        /* 3. SIDEBAR STYLING */
        body.light-theme .sidebar, 
        body.light-theme .sidebar-main,
        body.light-theme .sidebar-inner {
            background: #000000ff !important; 
            // background-color: #ffffff !important;
            border-right: 2px solid #000000 !important; /* Black Border */
        }
        
        /* Sidebar Text */
        body.light-theme .sidebar-menu-item__link,
        body.light-theme .sidebar-menu-item__link span {
            color: #000000 !important;
            background-color: transparent !important;
        }
        
        body.light-theme .sidebar-menu-item__link:hover {
            // background-color: #000000ff !important;
            color: #000000 !important;
        }
        
        /* Sidebar Active State */
        body.light-theme .sidebar-menu-item--active {
            // background-color: #000000ff !important;
            border-left: 4px solid #1890ff !important;
        }
        body.light-theme .sidebar-menu-item--active .sidebar-menu-item__link {
            background-color: transparent !important;
            color: #1890ff !important;
        }
        body.light-theme .sidebar-menu-item--active .icon {
            fill: #1890ff !important;
        }

        /* --- LOGO AREA FIX (Aggressive Override) --- */
        /* Keeps the top-left box DARK */
        body.light-theme .sidebar-branding {
            background-color: #1a1a1a !important; 
            border-bottom: 2px solid #000 !important;
        }
        
        /* Forces EVERYTHING inside the logo box to be WHITE */
        body.light-theme .sidebar-branding *,
        body.light-theme .sidebar-branding a,
        body.light-theme .sidebar-branding svg,
        body.light-theme .sidebar-branding path,
        body.light-theme .sidebar-branding .icon {
            color: #ffffff !important;
            fill: #ffffff !important;
        }

        /* 4. DASHBOARD PANELS */
        body.light-theme .summary-item,
        body.light-theme .nice-padding,
        body.light-theme .w-panel {
            background-color: #ffffff !important;
            border: 1px solid #e0e0e0 !important;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05) !important;
            color: #333 !important;
        }
        
        body.light-theme .summary-item h2, 
        body.light-theme .summary-item p,
        body.light-theme .w-panel h2 {
            color: #333 !important;
        }

        /* 5. BUTTON STYLE */
        #theme-toggle-btn {
            transition: all 0.3s ease;
        }
        #theme-toggle-btn:hover {
            transform: scale(1.1);
        }
    `;
    document.head.appendChild(style);
    // -------------------------------------------------------

    // 2. Create the Toggle Button
    const btn = document.createElement('div');
    btn.id = 'theme-toggle-btn';
    btn.innerHTML = '🌗'; 
    btn.title = "Switch Theme";
    
    // Target the Sidebar Branding Area (Near the bird)
    const brandingArea = document.querySelector('.sidebar-branding');

    if (brandingArea) {
        brandingArea.style.position = 'relative'; // Ensure absolute positioning works inside
        
        // Apply styling to button (Small, inside sidebar)
        Object.assign(btn.style, {
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Subtle glass effect
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            cursor: 'pointer',
            zIndex: '1000',
            border: '1px solid rgba(255,255,255,0.2)',
            userSelect: 'none'
        });
        
        brandingArea.appendChild(btn);
    } else {
        // Fallback to body if branding area not found
        Object.assign(btn.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: '#222',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            cursor: 'pointer',
            zIndex: '100000',
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
            userSelect: 'none'
        });
        document.body.appendChild(btn);
    }

    // 3. Logic to update UI
    function applyTheme(theme) {
        if (theme === 'light') {
            document.body.classList.add('light-theme');
            // Update Wagtail CSS Variables for Menu
            document.documentElement.style.setProperty('--w-color-surface-menus', '#ffffff');
            
            // Button Visuals (Blue in Light Mode)
            btn.style.backgroundColor = '#007bff';
            if (!brandingArea) btn.style.boxShadow = '0 4px 12px rgba(0, 123, 255, 0.4)';
        } else {
            document.body.classList.remove('light-theme');
            // Revert Wagtail CSS Variables
            document.documentElement.style.removeProperty('--w-color-surface-menus');
            
            // Button Visuals (Dark/Transparent in Dark Mode)
            if (brandingArea) {
                btn.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            } else {
                btn.style.backgroundColor = '#222';
                btn.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
            }
        }
    }

    // 4. Check Saved Preference on Load
    const savedTheme = localStorage.getItem('wagtail-custom-theme') || 'dark';
    applyTheme(savedTheme);

    // 5. Click Handler
    btn.addEventListener('click', function() {
        const isLight = document.body.classList.contains('light-theme');
        const newTheme = isLight ? 'dark' : 'light';
        
        applyTheme(newTheme);
        localStorage.setItem('wagtail-custom-theme', newTheme);
    });
});