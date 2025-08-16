function startGame() {
    playBackgroundMusic(); // 開始播放背景音樂
    setTimeout(() => {
        window.location.href = 'game.html';
    }, 500); // 稍微延遲跳轉，讓音樂開始播放
}

function goHome() {
    window.location.href = 'https://tasksnap-ytmctx95gflwfq9pxzje2z.streamlit.app';
}