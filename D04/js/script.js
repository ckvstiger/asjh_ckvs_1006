/**
 * 智光商工 x 安溪國中 技藝班 D04 課程專用腳本
 * 功能包含：週次同步、學習單切換、自我測驗模式（隱藏/顯示答案）、關鍵字檢索、原學習單圖檔燈箱
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. 自動設定下拉選單目前選中的週次
  const currentPath = window.location.pathname;
  const selectEl = document.getElementById('weekSelect');
  if (selectEl) {
    Array.from(selectEl.options).forEach(opt => {
      if (currentPath.includes(opt.value.replace('../', ''))) {
        opt.selected = true;
      }
    });
  }

  // 2. 學習單分頁 (Tabs) 切換邏輯
  const tabButtons = document.querySelectorAll('.worksheet-tab-btn');
  const worksheetCards = document.querySelectorAll('.worksheet-card');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetId = btn.getAttribute('data-target');

      if (targetId === 'all') {
        worksheetCards.forEach(card => {
          card.style.display = 'block';
          card.classList.add('animate-slide-up');
        });
      } else {
        worksheetCards.forEach(card => {
          if (card.id === targetId) {
            card.style.display = 'block';
            card.classList.add('animate-slide-up');
            // 平滑捲動至卡片位置
            card.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else {
            card.style.display = 'none';
          }
        });
      }
    });
  });

  // 3. 自我測驗模式 (Self-Test Mode) 切換
  const toggleTestModeBtn = document.getElementById('toggleTestModeBtn');
  let isTestMode = false;

  if (toggleTestModeBtn) {
    toggleTestModeBtn.addEventListener('click', () => {
      isTestMode = !isTestMode;
      document.body.classList.toggle('self-test-mode', isTestMode);

      if (isTestMode) {
        toggleTestModeBtn.innerHTML = '<span>👁️ 顯示解答與解析模式</span>';
        toggleTestModeBtn.classList.remove('btn-secondary');
        toggleTestModeBtn.classList.add('btn-accent');
      } else {
        toggleTestModeBtn.innerHTML = '<span>📝 自我測驗模式 (隱藏解答)</span>';
        toggleTestModeBtn.classList.remove('btn-accent');
        toggleTestModeBtn.classList.add('btn-secondary');
      }
    });
  }

  // 4. 單題解答展開按鈕 (測驗模式下單題點擊查看)
  const singleAnsBtns = document.querySelectorAll('.btn-show-single-ans');
  singleAnsBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const qCard = btn.closest('.question-item-card');
      if (qCard) {
        const correctOpt = qCard.querySelector('.option-badge.is-correct');
        const expBox = qCard.querySelector('.explanation-box');
        const correctIndicator = qCard.querySelector('.correct-indicator');

        if (correctOpt) {
          correctOpt.style.background = '#ecfdf5';
          correctOpt.style.borderColor = '#6ee7b7';
          correctOpt.style.color = '#065f46';
          correctOpt.style.fontWeight = 'bold';
        }
        if (expBox) expBox.style.display = 'block';
        if (correctIndicator) correctIndicator.style.display = 'flex';
        btn.style.display = 'none';
      }
    });
  });

  // 5. 題庫即時關鍵字搜尋
  const searchInput = document.getElementById('questionSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();
      const allQCards = document.querySelectorAll('.question-item-card');

      if (!query) {
        allQCards.forEach(q => q.style.display = 'block');
        return;
      }

      // 如果有搜尋字串，自動切換至「全部單元」
      const allTabBtn = document.querySelector('.worksheet-tab-btn[data-target="all"]');
      if (allTabBtn && !allTabBtn.classList.contains('active')) {
        allTabBtn.click();
      }

      allQCards.forEach(q => {
        const text = q.textContent.toLowerCase();
        if (text.includes(query)) {
          q.style.display = 'block';
        } else {
          q.style.display = 'none';
        }
      });
    });
  }

  // 6. 原圖預覽燈箱 (Lightbox Modal)
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const viewImgBtns = document.querySelectorAll('.btn-view-sheet-img');

  viewImgBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const imgSrc = btn.getAttribute('data-img');
      const title = btn.getAttribute('data-title');

      if (modal && modalImg && modalTitle) {
        modalImg.src = imgSrc;
        modalTitle.textContent = title || '學習單原圖檢視';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // 禁止背景滾動
      }
    });
  });

  const closeModal = () => {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });
});
