// Initialize Mermaid
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mermaid
    mermaid.initialize({
        startOnLoad: true,
        theme: 'default',
        securityLevel: 'loose',
        flowchart: {
            useMaxWidth: true,
            htmlLabels: true
        }
    });

    // Function to render diagrams
    function renderDiagrams() {
        // Show loading indicators
        var loadingElements = document.querySelectorAll('.loading');
        for (var i = 0; i < loadingElements.length; i++) {
            loadingElements[i].classList.add('active');
        }

        // Initialize mermaid
        mermaid.init(undefined, document.querySelectorAll('.mermaid'));

        // Hide loading indicators after a delay
        setTimeout(function() {
            for (var i = 0; i < loadingElements.length; i++) {
                loadingElements[i].classList.remove('active');
            }
        }, 1000);
    }

    // Setup tabs
    function setupTabs() {
        var tabs = document.querySelectorAll('.tab');
        for (var i = 0; i < tabs.length; i++) {
            tabs[i].addEventListener('click', function() {
                // Remove active class from all tabs
                for (var j = 0; j < tabs.length; j++) {
                    tabs[j].classList.remove('active');
                }

                // Add active class to clicked tab
                this.classList.add('active');

                // Hide all tab content
                var tabContents = document.querySelectorAll('.tab-content');
                for (var k = 0; k < tabContents.length; k++) {
                    tabContents[k].classList.remove('active');
                }

                // Show the corresponding tab content
                var tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');

                // Re-render mermaid diagrams if needed
                if (tabId === 'system-diagram' || tabId === 'sequence-diagram' || tabId === 'entity-relationship') {
                    renderDiagrams();
                }
            });
        }
    }

    // Folder toggle functionality
    function setupFolders() {
        var folders = document.querySelectorAll('.folder-name');
        for (var i = 0; i < folders.length; i++) {
            folders[i].addEventListener('click', function() {
                this.classList.toggle('open');

                // Toggle visibility of files in this folder
                var nextSibling = this.nextElementSibling;
                while (nextSibling) {
                    if (nextSibling.classList.contains('folder-name')) {
                        break;
                    }
                    if (nextSibling.classList.contains('file') ||
                        nextSibling.classList.contains('folder')) {
                        nextSibling.style.display = this.classList.contains('open') ? 'block' : 'none';
                    }
                    nextSibling = nextSibling.nextElementSibling;
                }
            });
        }
    }

    // File click functionality
    function setupFiles() {
        var files = document.querySelectorAll('.file');
        for (var i = 0; i < files.length; i++) {
            files[i].addEventListener('click', function() {
                var fileId = this.getAttribute('data-file').replace('.', '-');
                var fileContent = document.getElementById(fileId);

                if (fileContent) {
                    // Toggle the file content visibility
                    fileContent.classList.toggle('active');
                }
            });
        }
    }

    // Initialize folder states
    function initializeFolderStates() {
        var folders = document.querySelectorAll('.folder-name');
        for (var i = 0; i < folders.length; i++) {
            var folder = folders[i];
            if (folder.classList.contains('open')) {
                // Show files in open folders
                var nextSibling = folder.nextElementSibling;
                while (nextSibling) {
                    if (nextSibling.classList.contains('folder-name')) {
                        break;
                    }
                    if (nextSibling.classList.contains('file') ||
                        nextSibling.classList.contains('folder')) {
                        nextSibling.style.display = 'block';
                    }
                    nextSibling = nextSibling.nextElementSibling;
                }
            } else {
                // Hide files in closed folders
                var nextSibling = folder.nextElementSibling;
                while (nextSibling) {
                    if (nextSibling.classList.contains('folder-name')) {
                        break;
                    }
                    if (nextSibling.classList.contains('file') ||
                        nextSibling.classList.contains('folder')) {
                        nextSibling.style.display = 'none';
                    }
                    nextSibling = nextSibling.nextElementSibling;
                }
            }
        }
    }

    // Initialize everything
    setupTabs();
    setupFolders();
    setupFiles();
    initializeFolderStates();
    renderDiagrams();
});
