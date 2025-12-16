/* ========================================
   學校網站 - 主要互動功能
   ======================================== */

// ========================================
// 1. 導覽列功能
// ========================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// 漢堡選單切換
hamburger?.addEventListener('click', () => {
  navMenu?.classList.toggle('active');
});

// 點擊導覽項目時關閉選單
document.querySelectorAll('.nav-item > a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu?.classList.remove('active');
  });
});

// ========================================
// 2. 輪播功能
// ========================================

class Carousel {
  constructor() {
    this.items = document.querySelectorAll('.carousel-item');
    this.dots = document.querySelectorAll('.carousel-dot');
    this.prevBtn = document.querySelector('.carousel-btn.prev');
    this.nextBtn = document.querySelector('.carousel-btn.next');
    this.currentIndex = 0;
    this.autoPlayInterval = null;

    this.init();
  }

  init() {
    this.prevBtn?.addEventListener('click', () => this.prev());
    this.nextBtn?.addEventListener('click', () => this.next());
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goTo(index));
    });

    // 自動播放
    this.startAutoPlay();

    // 滑鼠懸停時暫停
    const carousel = document.querySelector('.carousel');
    carousel?.addEventListener('mouseenter', () => this.stopAutoPlay());
    carousel?.addEventListener('mouseleave', () => this.startAutoPlay());
  }

  show(index) {
    if (this.items.length === 0) return;

    this.items.forEach(item => item.classList.remove('active'));
    this.dots.forEach(dot => dot.classList.remove('active'));

    this.items[index].classList.add('active');
    this.dots[index]?.classList.add('active');
    this.currentIndex = index;
  }

  next() {
    const nextIndex = (this.currentIndex + 1) % this.items.length;
    this.show(nextIndex);
  }

  prev() {
    const prevIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    this.show(prevIndex);
  }

  goTo(index) {
    if (index >= 0 && index < this.items.length) {
      this.show(index);
    }
  }

  startAutoPlay() {
    if (this.items.length > 1) {
      this.autoPlayInterval = setInterval(() => this.next(), 5000);
    }
  }

  stopAutoPlay() {
    clearInterval(this.autoPlayInterval);
  }
}

// 初始化輪播
const carousel = new Carousel();

// ========================================
// 3. 回到頂端按鈕
// ========================================

const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn?.classList.add('show');
  } else {
    scrollTopBtn?.classList.remove('show');
  }
});

scrollTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========================================
// 4. 招生資訊資料（模擬）
// ========================================

const admissionData = [
  {
    date: '11.19',
    year: '2025',
    title: '寒假轉學生',
    description: '114學年度寒假轉學生\n2025.12.09上午10:00-2025.12.19中午12:00'
  },
  {
    date: '11.19',
    year: '2025',
    title: '新住民入學',
    description: '115學年度新住民入學\n2025.12.09上午10:00-2025.12.19中午12:00'
  },
  {
    date: '12.01',
    year: '2025',
    title: '四年制日間部',
    description: '115學年度四年制日間部招生\n2026.01.01上午10:00-2026.02.15中午12:00'
  },
  {
    date: '12.01',
    year: '2025',
    title: '二年制進修部',
    description: '115學年度二年制進修部招生\n2026.01.01上午10:00-2026.02.15中午12:00'
  }
];

// 動態載入招生卡片
function loadAdmissionCards() {
  const cardsContainer = document.querySelector('.admission-cards');
  if (!cardsContainer) return;

  cardsContainer.innerHTML = admissionData.map(item => `
    <div class="admission-card" onclick="handleCardClick('${item.title}')">
      <div class="card-header">
        <div class="card-date">${item.date}</div>
        <div class="card-date-year">${item.year}</div>
      </div>
      <div class="card-body">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
    </div>
  `).join('');
}

// 卡片點擊事件
function handleCardClick(title) {
  console.log('招生類型:', title);
  // 可連結至詳細頁面
  // window.location.href = '/pages/admission.html?type=' + encodeURIComponent(title);
}

// 初始化招生卡片
loadAdmissionCards();

// ========================================
// 5. 搜尋功能（簡易版）
// ========================================

const searchIcon = document.querySelector('.search-icon');
searchIcon?.addEventListener('click', () => {
  const query = prompt('搜尋內容:');
  if (query) {
    handleSearch(query);
  }
});

function handleSearch(query) {
  console.log('搜尋:', query);
  // 可實現關鍵字過濾
}

// ========================================
// 6. 頁面載入完成提示
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('網站已載入完成！');
});

// ========================================
// 7. 實用工具函數
// ========================================

// 延遲執行
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 防抖函數
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 節流函數
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
