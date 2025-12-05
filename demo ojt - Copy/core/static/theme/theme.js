document.addEventListener('DOMContentLoaded', function() {
    

    if (document.getElementById('theme-toggle-btn')) return;

    const style = document.createElement('style');
    style.innerHTML = `

        

        body.light-theme .content-wrapper, 
        body.light-theme .main-content, 
        body.light-theme .wrapper,
        body.light-theme main {
            background-color: #f3f3f3 ; 
            color: #222222 ;
        }


        body.light-theme header, 
        body.light-theme .w-header,
        body.light-theme .row.header {
            background-color: #ffffff ;
            border-bottom: 1px solid #e0e0e0 ;
        }

        body.light-theme h1, 
        body.light-theme h2, 
        body.light-theme .w-header__title, 
        body.light-theme .left, 
        body.light-theme .col12 {
            color: #222222 ;
            text-shadow: none ;
        }

        body.light-theme .summary-item,
        body.light-theme .nice-padding,
        body.light-theme .w-panel {
            background-color: #ffffff  ;
            border: 1px solid #e0e0e0 ;
            color: #333 ;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }

    
        body.light-theme .sidebar,
        body.light-theme .sidebar-main {
            background-color: #2c3e50 ;
            color: #ffffff ;
        }
        body.light-theme .sidebar-menu-item__link {
            color: #dcdcdc ;
        }
        body.light-theme .sidebar-menu-item__link:hover {
            background-color: rgba(255,255,255,0.1) ;
        }


        #theme-toggle-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 99999;
            padding: 10px 20px;
            background-color: #222;
            color: #fff;
            border: 2px solid #444;
            border-radius: 30px;
            cursor: pointer;
            font-weight: bold;
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
        }
        
        body.light-theme #theme-toggle-btn {
            background-color: #007bff;
            border-color: #007bff;
            color: white;
        }
        
        #theme-toggle-btn:hover {
            transform: scale(1.05);
        }
    `;
    document.head.appendChild(style);
    const btn = document.createElement('button');
    btn.id = 'theme-toggle-btn';
    btn.innerHTML = '🌗 Theme';
    document.body.appendChild(btn);

    function applyTheme(theme) {
        if (theme === 'light') {
            document.body.classList.add('light-theme');
        } else {
            document.body.classList.remove('light-theme');
        }
    }

    const savedTheme = localStorage.getItem('wagtail-custom-theme') || 'dark';
    applyTheme(savedTheme);

    btn.addEventListener('click', function() {
        const isLight = document.body.classList.contains('light-theme');
        const newTheme = isLight ? 'dark' : 'light';
        
        applyTheme(newTheme);
        localStorage.setItem('wagtail-custom-theme', newTheme);
    });
});