(function() {
    // USE THIS IN THE PAGES
    // <div id="menu-placeholder"></div>
    // <script src="https://liiwaa-osb.github.io/AUB-OSB-shared-components/load-menu.js"></script>

    var baseUrl = 'https://liiwaa-osb.github.io/AUB-OSB-shared-components/';
    // lii replace with live

   var scriptPath = document.currentScript.src;
    var basePath = scriptPath.substring(0, scriptPath.lastIndexOf('/') + 1);

    var menuCSS = baseUrl + 'menu.css';
    var menuHTML = baseUrl + 'menu.html';
    var menuJS = baseUrl + 'menu.js';

    // Load CSS
    var cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = menuCSS;
    document.head.appendChild(cssLink);

    // Load HTML
    fetch(menuHTML)
        .then(function(response) {
            if (!response.ok) throw new Error('Failed to load menu HTML');
            return response.text();
        })
        .then(function(html) {
            var placeholder = document.getElementById('menu-placeholder');
            if (!placeholder) {
                console.error('Menu placeholder not found.');
                return;
            }
            placeholder.innerHTML = html;

            // Load JS after HTML is injected
            var script = document.createElement('script');
            script.src = menuJS;
            script.onload = function() {
                console.log('Menu loaded successfully.');
                // Initialize any menu-specific JS here
                if (typeof initMenu === 'function') {
                    initMenu();
                }
            };
            script.onerror = function() {
                console.error('Failed to load menu JavaScript.');
            };
            document.body.appendChild(script);
        })
        .catch(function(error) {
            console.error('Error loading menu:', error);
        });
})();