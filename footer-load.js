(function() {
    // USE THIS IN THE PAGES
    // <div id="footer-placeholder"></div>
    // <script src="https://www.aub.edu.lb/osb/AUB_OSB_shared_components/footer-load.js"></script>

    var baseUrl = 'https://www.aub.edu.lb/osb/AUB_OSB_shared_components/';

   var scriptPath = document.currentScript.src;
    var basePath = scriptPath.substring(0, scriptPath.lastIndexOf('/') + 1);

    var footerCSS = baseUrl + 'footer.css';
    var footerHTML = baseUrl + 'footer.html';
    var footerJS = baseUrl + 'footer.js';

    // Load CSS
    var cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = footerCSS;
    document.head.appendChild(cssLink);

    // Load HTML
    fetch(footerHTML)
        .then(function(response) {
            if (!response.ok) throw new Error('Failed to load footer HTML');
            return response.text();
        })
        .then(function(html) {
            var placeholder = document.getElementById('footer-placeholder');
            if (!placeholder) {
                console.error('Footer placeholder not found.');
                return;
            }
            placeholder.innerHTML = html;

            // Load JS after HTML is injected
            var script = document.createElement('script');
            script.src = footerJS;
            script.onload = function() {
                console.log('Footer loaded successfully.');
                // Initialize any footer-specific JS here
                if (typeof initFooter === 'function') {
                    initFooter();
                }
            };
            script.onerror = function() {
                console.error('Failed to load footer JavaScript.');
            };
            document.body.appendChild(script);
        })
        .catch(function(error) {
            console.error('Error loading footer:', error);
        });
})();