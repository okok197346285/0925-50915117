const cardContainer = document.getElementById('card-container');
const cardSetSelect = document.getElementById('cardSet');
const countdownDisplay = document.getElementById('countdown');

const cardSets = {
    set1: [
        '1.png',
        '2.png',
        '3.png',
        '4.png',
        '5.png',
        '6.png',
        '7.png',
        '8.png'
    ],
    set2: [
        '9.png',
        '10.png',
        '11.png',
        '12.png',
        '13.png',
        '14.png',
        '15.png',
        '16.png'
    ]
};

const backImages = {
    set1: '17.png',
    set2: '18.png'
};

let cards = [];
let countdownActive = false; // 用於追蹤倒數狀態

function generateCards() {
    const selectedSet = cardSetSelect.value;
    cards = [...cardSets[selectedSet], ...cardSets[selectedSet]];
    cards.sort(() => Math.random() - 0.5);
    cardContainer.innerHTML = '';

    cards.forEach(image => {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front" style="background-image: url('${image}'); background-size: cover;"></div>
                <div class="card-back" style="background-image: url('${backImages[selectedSet]}'); background-size: cover;"></div>
            </div>
        `;

        // 為卡片添加點擊事件
        card.addEventListener('click', () => {
            card.classList.toggle('flipped'); // 翻轉卡片
        });

        cardContainer.appendChild(card);
    });
}

document.getElementById('startGame').addEventListener('click', () => {
    if (countdownActive) return; // 如果正在倒數，則不執行
    countdownActive = true; // 開啟倒數狀態
    countdownDisplay.textContent = 0; // 重置倒數顯示

    generateCards(); // 生成卡片

    // 立即顯示正面
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => {
        card.classList.remove('flipped'); // 顯示正面
    });

    // 倒數 10 秒後翻回背面
    let countdown = 0; // 從0開始倒數
    const countdownInterval = setInterval(() => {
        countdown++;
        countdownDisplay.textContent = countdown; // 顯示倒數數字
        countdownDisplay.style.fontSize = `${24 + countdown * 4}px`; // 增加字體大小
        
        if (countdown >= 10) {
            clearInterval(countdownInterval);
            allCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('flipped'); // 翻回背面
                }, (Math.floor(index / 4) * 300) + (index % 4) * 100); // 依序翻轉
            });

            // 倒數結束後重置狀態
            setTimeout(() => {
                countdownActive = false; // 重置倒數狀態
                countdownDisplay.textContent = ''; // 清空倒數顯示
            }, allCards.length * 300);
        }
    }, 1000); // 每秒更新
});

// 按鈕事件：顯示正面
document.getElementById('showFront').addEventListener('click', () => {
    const allCards = document.querySelectorAll('.card');
    allCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.remove('flipped'); // 顯示正面
        }, (Math.floor(index / 4) * 300) + (index % 4) * 100); // 依序顯示正面
    });
});

// 按鈕事件：顯示背面
document.getElementById('showBack').addEventListener('click', () => {
    document.querySelectorAll('.card').forEach(card => {
        card.classList.add('flipped'); // 顯示背面
    });
});
