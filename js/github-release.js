async function getLatestRelease() {
    try {
        const response = await fetch('https://api.github.com/repos/Liamzai/QuickNote/releases/latest');
        const data = await response.json();
        
        // 查找.dmg.zip文件
        const asset = data.assets.find(asset => asset.name.endsWith('.zip'));
        if (asset) {
            return asset.browser_download_url;
        }
        return null;
    } catch (error) {
        console.error('Error fetching latest release:', error);
        return null;
    }
}

async function updateDownloadButton() {
    const downloadBtn = document.querySelector('.download-btn');
    const downloadUrl = await getLatestRelease();
    
    if (downloadUrl) {
        downloadBtn.href = downloadUrl;
        
        const response = await fetch('https://api.github.com/repos/Liamzai/QuickNote/releases/latest');
        const data = await response.json();
        const versionInfo = document.querySelector('.download-info');
        if (versionInfo) {
            versionInfo.textContent = `版本 ${data.tag_name} | macOS 13.0+`;
        }
    }
}

document.addEventListener('DOMContentLoaded', updateDownloadButton); 