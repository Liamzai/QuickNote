function handleDownload(event) {
    event.preventDefault();
    const downloadLink = document.createElement('a');
    downloadLink.href = 'https://github.com/user-attachments/files/18209064/QuickNote.zip';
    downloadLink.download = 'QuickNote.zip';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

function updateDownloadButtons() {
    const mainDownloadBtn = document.querySelector('.main-download-btn');
    if (mainDownloadBtn) {
        mainDownloadBtn.addEventListener('click', handleDownload);
    }

    const topDownloadBtn = document.querySelector('.hero-buttons .download-btn');
    if (topDownloadBtn) {
        topDownloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const downloadSection = document.querySelector('#download');
            if (downloadSection) {
                downloadSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    const versionElements = document.querySelectorAll('.version span:first-child');
    versionElements.forEach(el => {
        el.textContent = '版本 0.0.1';
    });

    const downloadInfoElements = document.querySelectorAll('.download-info');
    downloadInfoElements.forEach(el => {
        el.textContent = '版本 0.0.1 | macOS 13.0+';
    });
}

document.addEventListener('DOMContentLoaded', updateDownloadButtons); 