async function getLatestRelease() {
    try {
        const response = await fetch('https://api.github.com/repos/Liamzai/QuickNote/releases', {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const releases = await response.json();
        
        if (!releases || !Array.isArray(releases) || releases.length === 0) {
            console.log('No releases found');
            return null;
        }

        const latestRelease = releases[0];
        
        if (!latestRelease.assets || latestRelease.assets.length === 0) {
            console.log('No assets found in the latest release');
            return null;
        }

        const asset = latestRelease.assets[0];
        return {
            downloadUrl: asset.browser_download_url,
            version: latestRelease.tag_name,
            name: asset.name
        };
    } catch (error) {
        console.error('Error fetching releases:', error);
        return null;
    }
}

async function updateDownloadButtons() {
    try {
        const downloadBtns = document.querySelectorAll('.download-btn');
        const releaseInfo = await getLatestRelease();
        
        if (releaseInfo) {
            downloadBtns.forEach(btn => {
                btn.href = releaseInfo.downloadUrl;
                if (!btn.querySelector('*')) {
                    btn.textContent = '下载快速笔记';
                }
            });

            const versionElements = document.querySelectorAll('.version span:first-child');
            versionElements.forEach(el => {
                el.textContent = `版本 ${releaseInfo.version}`;
            });

            const downloadInfoElements = document.querySelectorAll('.download-info');
            downloadInfoElements.forEach(el => {
                el.textContent = `版本 ${releaseInfo.version} | macOS 13.0+`;
            });

            console.log('Successfully updated download information:', releaseInfo);
        } else {
            downloadBtns.forEach(btn => {
                btn.href = '#';
                if (!btn.querySelector('*')) {
                    btn.textContent = '即将发布';
                }
            });

            const versionElements = document.querySelectorAll('.version span:first-child');
            versionElements.forEach(el => {
                el.textContent = '即将发布';
            });

            const downloadInfoElements = document.querySelectorAll('.download-info');
            downloadInfoElements.forEach(el => {
                el.textContent = '即将发布';
            });
        }
    } catch (error) {
        console.error('Error updating download buttons:', error);
    }
}

document.addEventListener('DOMContentLoaded', updateDownloadButtons);

setInterval(updateDownloadButtons, 60000); 