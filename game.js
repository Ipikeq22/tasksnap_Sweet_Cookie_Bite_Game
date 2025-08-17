function getFortune() {
    const btn = document.querySelector('.fortune-btn');
    const machine = document.querySelector('.cookie-machine');
    
    // 播放搖晃音效
    playShakeSound();
    
    // 強烈震動動畫和disco效果
    machine.style.animation = 'machineShake 5.5s ease-in-out';
    document.body.classList.add('disco-mode');
    
    setTimeout(() => {
        const fortune = getRandomFortune();
        
        // 播放籤文音效
        playFortuneSound();
        
        let htmlContent = '';
        
        // 如果不是第一次且有上一次的運勢，就顯示在上方
        if (!isFirstFortune && previousFortune) {
            htmlContent += `<div style="background: #f0f0f0; padding: 8px; margin-bottom: 15px; border-radius: 5px; font-size: 0.8em; color: #666;">
                <strong>今日運勢：</strong><br>
                ${previousFortune.content.replace('今日運勢：', '')}
            </div>`;
        }
        
        htmlContent += fortune.content.replace(/\n/g, '<br>').replace(/- ([^<]+)$/, '<div style="text-align: center; margin-top: 10px;">- $1</div>');
        
        Swal.fire({
            title: fortune.category,
            html: htmlContent,
            iconHtml: '🍪',
            confirmButtonText: '再來一次',
            confirmButtonColor: '#ff5a78',
            showCancelButton: true,
            cancelButtonText: '分享',
            cancelButtonColor: '#3085d6',
            background: '#fff8e1',
            color: '#5d4037',
            showClass: {
                popup: 'animate__animated animate__bounceIn'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOut'
            },
            customClass: {
                icon: 'swal2-cookie-icon',
                confirmButton: 'comic-brutal-button',
                cancelButton: 'comic-brutal-button'
            },
            didOpen: () => {
                const confirmBtn = document.querySelector('.swal2-confirm');
                const cancelBtn = document.querySelector('.swal2-cancel');
                if (confirmBtn) {
                    confirmBtn.innerHTML = '再來一次';
                }
                if (cancelBtn) {
                    cancelBtn.innerHTML = '分享';
                    cancelBtn.addEventListener('click', () => {
                        shareContent(fortune, previousFortune);
                    });
                }
            }
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.cancel) {
                // 分享按鈕被點擊，但不關閉對話框
                return false;
            }
        });
        
        // 重置動畫
        machine.style.animation = 'pulse 2s ease-in-out infinite';
        document.body.classList.remove('disco-mode');
    }, 5500);
}

// 繼續播放背景音樂
window.addEventListener('load', () => {
    setTimeout(() => {
        if (window.gameMusic && window.gameMusic.paused) {
            window.gameMusic.play().catch(e => console.log('繼續播放音樂失敗:', e));
        } else if (!window.gameMusic) {
            playBackgroundMusic();
        }
    }, 500);
});

// 點擊任意地方嘗試播放音樂
document.addEventListener('click', () => {
    if (window.gameMusic && window.gameMusic.paused) {
        window.gameMusic.play().catch(e => console.log('音樂播放失敗:', e));
    }
}, { once: true });

// 分享功能
function shareContent(currentFortune, todayFortune) {
    console.log('currentFortune:', currentFortune);
    console.log('todayFortune:', todayFortune);
    
    // 獲取今日運勢文字
    let todayFortuneText = '未知';
    if (todayFortune && todayFortune.content) {
        todayFortuneText = todayFortune.content.replace('今日運勢：', '').trim();
    } else if (previousFortune && previousFortune.content) {
        todayFortuneText = previousFortune.content.replace('今日運勢：', '').trim();
    }
    
    // 獲取當前籤文文字
    let currentFortuneText = '未知';
    if (currentFortune && currentFortune.content) {
        currentFortuneText = currentFortune.content.replace(/<br>/g, '\n').replace(/<[^>]*>/g, '').trim();
        // 如果是名人金句，縮短人名部分
        if (currentFortune.category && currentFortune.category.includes('名人金句')) {
            currentFortuneText = currentFortuneText.replace(/\n\n- (.+)$/, '\n- $1');
        }
    }
    
    const shareText = `🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪
🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪

今日運勢：
${todayFortuneText}

${currentFortune.category || '未知'}：
${currentFortuneText}

參觀tasksnap官網：
https://tasksnap-ytmctx95gflwfq9pxzje2z.streamlit.app/

🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪
🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪`;
    
    console.log('shareText:', shareText);
    
    // 直接複製到剪貼簿
    navigator.clipboard.writeText(shareText).then(() => {
        Swal.fire({
            title: '已複製到剪貼簿！',
            text: '可以貼到社交媒體分享囉！',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
            customClass: {
                popup: 'share-success-popup'
            }
        });
    }).catch(err => {
        console.log('複製失敗:', err);
        // 備用方案：使用prompt讓用戶手動複製
        const textArea = document.createElement('textarea');
        textArea.value = shareText;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            Swal.fire({
                title: '已複製到剪貼簿！',
                text: '可以貼到社交媒體分享囉！',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });
        } catch (fallbackErr) {
            alert('複製失敗，請手動複製以下內容：\n\n' + shareText);
        }
        document.body.removeChild(textArea);
    });
}

function goBack() {
    // 重置遊戲狀態
    resetGameState();
    // 保持音樂播放狀態
    if (window.gameMusic && !window.gameMusic.paused) {
        sessionStorage.setItem('musicPlaying', 'true');
        sessionStorage.setItem('musicTime', window.gameMusic.currentTime);
    }
    window.location.href = 'index.html';
}
