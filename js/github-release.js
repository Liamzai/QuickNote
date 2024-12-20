async function getLatestRelease() {
    try {
        const response = await fetch('https://api.github.com/repos/Liamzai/QuickNote/releases/latest', {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // 确保assets存在且是数组
        if (data.assets && Array.isArray(data.assets)) {
            // 查找.zip文件
            const asset = data.assets.find(asset => asset && asset.name && asset.name.endsWith('.zip'));
            if (asset) {
                return {
                    downloadUrl: asset.browser_download_url,
                    version: data.tag_name
                };
            }
        }
        console.log('No suitable release asset found');
        return null;
    } catch (error) {
        console.error('Error fetching latest release:', error);
        return null;
    }
}

async function updateDownloadButton() {
    try {
        const downloadBtn = document.querySelector('.download-btn');
        const versionInfo = document.querySelector('.version');
        
        if (!downloadBtn || !versionInfo) {
            console.error('Download button or version info element not found');
            return;
        }

        const releaseInfo = await getLatestRelease();
        
        if (releaseInfo) {
            downloadBtn.href = releaseInfo.downloadUrl;
            // 更新版本信息
            const versionSpan = versionInfo.querySelector('span');
            if (versionSpan) {
                versionSpan.textContent = `版本 ${releaseInfo.version}`;
            }
        } else {
            // 如果没有找到release，显示提示信息
            downloadBtn.href = '#';
            downloadBtn.textContent = '暂无可用下载';
            const versionSpan = versionInfo.querySelector('span');
            if (versionSpan) {
                versionSpan.textContent = '暂无版本信息';
            }
        }
    } catch (error) {
        console.error('Error updating download button:', error);
    }
}

// 页面加载完成后更新下载按钮
document.addEventListener('DOMContentLoaded', updateDownloadButton); 