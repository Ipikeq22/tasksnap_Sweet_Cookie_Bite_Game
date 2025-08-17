// 音效管理
let bgMusic = null;

// 播放搖晃音效
function playShakeSound() {
    const audio = new Audio('music/funny.mp3');
    audio.volume = 0.8;
    audio.addEventListener('ended', () => {
        playBackgroundMusic();
    });
    audio.play().catch(e => console.log('搖晃音效播放失敗:', e));
}

// 播放籤文音效
function playFortuneSound() {
    const audio = new Audio('music/flap1.mp3');
    audio.volume = 1.0;
    audio.addEventListener('ended', () => {
        setTimeout(() => {
            if (window.gameMusic && window.gameMusic.paused) {
                window.gameMusic.play().catch(e => console.log('恢復音樂失敗:', e));
            }
        }, 1500);
    });
    audio.play().catch(e => console.log('籤文音效播放失敗:', e));
}

// 播放背景音樂
function playBackgroundMusic() {
    // 先檢查是否已經有全域音樂
    if (window.gameMusic) {
        bgMusic = window.gameMusic;
        if (bgMusic.paused) {
            bgMusic.play().catch(e => console.log('繼續播放失敗:', e));
        }
        return;
    }
    
    if (!bgMusic) {
        bgMusic = new Audio('music/Hopscotch Dreams.mp3');
        bgMusic.volume = 0.5;
        bgMusic.loop = true;
        window.gameMusic = bgMusic; // 儲存到全域
    }
    
    bgMusic.play().catch(e => {
        console.log('背景音樂播放失敗:', e);
        document.addEventListener('click', () => {
            bgMusic.play().catch(err => console.log('再次嘗試播放失敗:', err));
        }, { once: true });
    });
}

// 停止背景音樂
function stopBackgroundMusic() {
    if (bgMusic) {
        bgMusic.pause();
        bgMusic.currentTime = 0;
    }
}

// 音效管理
function playClickSound() {
    // 方法1: 使用自己的 MP3 檔案 (推薦)
    const audio = new Audio('music/click.mp3'); // 將你的MP3檔案放在music資料夾內，並命名為click.mp3
    audio.volume = 0.7; // 調整音量 (0.0 到 1.0)
    audio.play().catch(e => console.log('音效播放失敗:', e)); // 播放音效，如果失敗會在控制台顯示錯誤
    
    /* 方法2: 如果要使用多個音效檔案，可以隨機播放
    const sounds = [
        'music/click1.mp3',
        'music/click2.mp3', 
        'music/click3.mp3'
    ];
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    const audio = new Audio(randomSound);
    audio.volume = 0.7;
    audio.play().catch(e => console.log('音效播放失敗:', e));
    */
    
    /* 方法3: 預載音效以避免延遲 (適合重複播放的音效)
    if (!window.clickAudio) {
        window.clickAudio = new Audio('music/click.mp3');
        window.clickAudio.volume = 0.7;
        window.clickAudio.preload = 'auto';
    }
    window.clickAudio.currentTime = 0; // 重置播放位置
    window.clickAudio.play().catch(e => console.log('音效播放失敗:', e));
    */
}
