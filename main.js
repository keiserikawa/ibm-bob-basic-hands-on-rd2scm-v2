'use strict';

// ============================================================
// DOM 取得
// ============================================================
const searchInput   = document.getElementById('search-input');
const filterButtons = document.querySelectorAll('.filter-btn');
const faqItems      = document.querySelectorAll('.faq-item');
const faqEmpty      = document.getElementById('faq-empty');

// ============================================================
// 状態
// ============================================================
let currentCategory = 'all';

// ============================================================
// FAQ 絞り込み
// ============================================================

/**
 * 現在の検索テキストとカテゴリに基づいて FAQ を絞り込む
 */
function filterFAQ() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  faqItems.forEach(function (item) {
    const category = item.dataset.category;
    const questionText = item.querySelector('.faq-question-text').textContent.toLowerCase();
    const answerText   = item.querySelector('.faq-answer').textContent.toLowerCase();

    const matchesCategory = currentCategory === 'all' || category === currentCategory;
    const matchesQuery    = query === '' || questionText.includes(query) || answerText.includes(query);

    if (matchesCategory && matchesQuery) {
      item.style.display = '';
      visibleCount++;
    } else {
      item.style.display = 'none';
    }
  });

  // 空状態の表示・非表示
  if (visibleCount === 0) {
    faqEmpty.removeAttribute('hidden');
  } else {
    faqEmpty.setAttribute('hidden', '');
  }
}

// ============================================================
// 検索バーイベント
// ============================================================
searchInput.addEventListener('input', filterFAQ);

// ============================================================
// カテゴリフィルタイベント
// ============================================================
filterButtons.forEach(function (btn) {
  btn.addEventListener('click', function () {
    currentCategory = btn.dataset.category;

    // アクティブクラスの切り替え
    filterButtons.forEach(function (b) {
      b.classList.remove('filter-btn--active');
    });
    btn.classList.add('filter-btn--active');

    filterFAQ();
  });
});

// ============================================================
// アコーディオンイベント
// ============================================================
faqItems.forEach(function (item) {
  const questionBtn = item.querySelector('.faq-question');
  const answerPanel = item.querySelector('.faq-answer');

  questionBtn.addEventListener('click', function () {
    const isExpanded = questionBtn.getAttribute('aria-expanded') === 'true';

    if (isExpanded) {
      questionBtn.setAttribute('aria-expanded', 'false');
      answerPanel.setAttribute('hidden', '');
    } else {
      questionBtn.setAttribute('aria-expanded', 'true');
      answerPanel.removeAttribute('hidden');
    }
  });
});

// ============================================================
// ダークテーマ切り替え
// ============================================================
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', function () {
  const isDark = document.body.classList.toggle('dark-theme');
  themeToggle.textContent = isDark ? '☀️ ライト' : '🌙 ダーク';
});
