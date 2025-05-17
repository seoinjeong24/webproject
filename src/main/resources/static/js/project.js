const pages = ['about', 'main', 'mypage', 'map', 'feedback', 'login', 'signup', 'favorites', 'search'];
const pageListWithSidebar = ['all-items', 'expiring', 'favorites', 'frozen', 'refrigerated', 'room-temp', 'add', 'search'];
let isLoggedIn = false;
let pendingPage = null;

function navigateTo(pageId) {
  if (!isLoggedIn && !['login', 'signup', 'about'].includes(pageId)) {
    pendingPage = pageId;
    document.getElementById('auth-buttons')?.style.setProperty('display', 'none');
    showPage('login');
    return;
  }

  document.querySelectorAll('section').forEach(sec => sec.classList.remove('active'));
  const target = document.getElementById(pageId);
  if (target) target.classList.add('active');

  const sidebar = document.getElementById('sidebar');
  if (pageListWithSidebar.includes(pageId)) {
    sidebar.classList.add('active');
  } else {
    sidebar.classList.remove('active');
  }

  document.querySelectorAll('#sidebar .menu-item').forEach(el => el.classList.remove('active'));
  const activeMenu = document.querySelector(`#sidebar .menu-item[onclick*="${pageId}"]`);
  if (activeMenu) activeMenu.classList.add('active');

  if (pageId === 'mypage') {
    updateMyPageInfo();
  }
  if (pageId === 'all-items') {
    labelFilter = 'all';
    storageFilter = null;
    const input = document.getElementById('search-input');
    if (input) input.value = '';
    renderItems();
  }
   // ★ 추가 페이지 전환 시 폼 리셋
   if (pageId === 'add') {
    // 검색창도 클리어
    document.getElementById('search-input').value = '';
    // 추가 폼 안의 입력값들 초기화
    document.getElementById('add-form').reset();
  }
  // 5) 추가 폼 저장 및 목록에 추가
document.getElementById('add-form').addEventListener('submit', e => {
    e.preventDefault();
  
    // 입력값 가져오기
    const name = document.getElementById('add-name').value.trim();
    const categoryKey = document.getElementById('add-category').value;
    const expiresRaw = document.getElementById('add-expires').value; // "YYYY-MM-DD"
  
    // expires 포맷 통일: "YYYY.MM.DD"
    const [y,m,d] = expiresRaw.split('-');
    const expires = `${y}.${m}.${d}`;
  
    // 새 아이템 생성
    const newItem = {
      id: Date.now(),         // 고유값
      name,
      category: categoryMap[categoryKey], // { frozen:'냉동', ... }
      expires,
      favorite: false,
      done: false
    };
  
    // 배열에 추가 & (옵션) 로컬스토리지에 저장
    items.push(newItem);
    localStorage.setItem('items', JSON.stringify(items));
  
    // 사이드바 개수 업데이트 & 렌더
    renderSidebarCounts();
  
    // 폼 초기화
    e.target.reset();
  
    // 전체 목록으로 돌아가서 갱신
    navigateTo('all-items');
  });
  
}

function showPage(pageId) {
  pages.forEach(p => document.getElementById(p)?.classList.remove('active'));
  document.getElementById(pageId)?.classList.add('active');
  document.getElementById('sidebar').classList.remove('active');
  if (pageId === 'about') {
    document.querySelector('.about-container')?.style.removeProperty('display');
    document.getElementById('auth-buttons')?.style.removeProperty('display');
  }
}

function showLogin() {
  document.getElementById('auth-buttons').style.display = 'none';
  showPage('login');
}

function showSignUp() {
  document.getElementById('auth-buttons').style.display = 'none';
  showPage('signup');
}

function showFeedback() {
  document.getElementById('auth-buttons').style.display = 'none';
  showPage('feedback');
}

function createAccount() {
  const username = document.getElementById('signup-username').value.trim();
  const id = document.getElementById('signup-id').value.trim();
  const password = document.getElementById('signup-password').value.trim();

  if (!username || !id || !password) {
    alert('모든 항목을 입력해주세요.');
    return;
  }

  const existingUser = localStorage.getItem(`user:${id}`);
  if (existingUser) {
    alert('이미 존재하는 ID입니다.');
    return;
  }

  localStorage.setItem(`user:${id}`, JSON.stringify({ username, id, password }));
  alert('회원가입이 완료되었습니다! 로그인 후 이용해주세요.');
  showPage('login');
}

function performLogin() {
  const id = document.getElementById('login-id').value.trim();
  const pw = document.getElementById('login-password').value;

  if (!id || !pw) {
    alert('ID와 비밀번호를 입력해주세요.');
    return;
  }

  const userData = localStorage.getItem(`user:${id}`);
  if (!userData) {
    alert('존재하지 않는 사용자입니다.');
    return;
  }
  const { username, password } = JSON.parse(userData);
  if (password !== pw) {
    alert('비밀번호가 일치하지 않습니다.');
    return;
  }

  isLoggedIn = true;
  localStorage.setItem('currentUser', id);

  document.getElementById('welcome-message').innerText = `${username}님 환영합니다!`;
  document.getElementById('profile-username').value = username;
  document.getElementById('profile-id').value = id;

  alert('로그인되었습니다!');

  document.getElementById('auth-buttons').style.display = 'none';

  const dest = pendingPage || 'mypage';
  pendingPage = null;
  navigateTo(dest);
}

function updateMyPageInfo() {
  const currentId = localStorage.getItem('currentUser');
  if (!currentId) return;

  const userData = localStorage.getItem(`user:${currentId}`);
  if (!userData) return;

  const parsed = JSON.parse(userData);
  if (!parsed.username || !parsed.id) return;

  document.getElementById('welcome-message').innerText = `${parsed.username}님 환영합니다!`;
  document.getElementById('profile-username').value = parsed.username;
  document.getElementById('profile-id').value = parsed.id;
}

const items = [
  { id: 1, category: "냉동", name: "item", expire: "2025-06-30", favorite: true, expiring: false, done: false },
  { id: 2, category: "냉장", name: "item", expire: "2025-05-10", favorite: false, expiring: true, done: false },
  { id: 3, category: "실온", name: "item", expire: "2025-05-08", favorite: true, expiring: true, done: true }
];

let labelFilter = 'all';
let storageFilter = null;

function renderItems() {
  const keyword = document.getElementById("search-input").value.toLowerCase();
  const container = document.getElementById("item-list");
  container.innerHTML = '';

  const filtered = items.filter(item => {
    if (labelFilter === 'favorite' && !item.favorite) return false;
    if (labelFilter === 'expiring' && !item.expiring) return false;
    if (storageFilter && item.category !== storageFilter) return false;
    if (keyword && !item.name.toLowerCase().includes(keyword)) return false;
    return true;
  });

  document.getElementById('item-count').innerText = `(${filtered.length})`;

  for (const item of filtered) {
    const card = document.createElement('div');
    card.className = 'item-card' + (item.done ? ' checked' : '');

    card.innerHTML = `
      <div style="display: flex; align-items: center; gap: 1rem;">
        <span style="cursor: pointer; font-size: 1.2rem;" onclick="toggleFavorite(${item.id})">${item.favorite ? '★' : '☆'}</span>
        <div>
          <div style="font-size: 0.8rem; color: #999;">${item.category}</div>
          <div style="font-weight: bold;">${item.name}</div>
          <div style="font-size: 0.85rem; color: ${item.expiring ? '#cc0000' : '#777'};">
            ${item.expiring ? 'Supporting line text lorem ipsum dolor sit amet, consectetur.' : `~ ${item.expire}`}
          </div>
        </div>
      </div>
      <input type="checkbox" ${item.done ? 'checked' : ''} onclick="toggleDone(${item.id})"/>
    `;

    container.appendChild(card);
  }
}

function toggleFavorite(id) {
  const item = items.find(i => i.id === id);
  if (item) {
    item.favorite = !item.favorite;
    renderItems();
  }
}

function toggleDone(id) {
  const item = items.find(i => i.id === id);
  if (item) {
    item.done = !item.done;
    renderItems();
  }
}

function filterByLabel(label) {
  labelFilter = label;
  document.querySelectorAll('.label-button').forEach(btn => btn.classList.remove('active'));
  document.getElementById(`label-${label}`).classList.add('active');
  renderItems();
}

function filterByStorage(storage) {
  storageFilter = storage;
  renderItems();
}

window.addEventListener('DOMContentLoaded', () => {
  navigateTo('about');
});

function filterItems(el, title, type) {
  // 홈 소개글 + auth 숨기기
  document.getElementById('sidebar').classList.add('active');
  document.querySelector('.about-container')?.style.setProperty('display', 'none');
  document.getElementById('auth-buttons')?.style.setProperty('display', 'none');

  // 모든 section 숨기기
  document.querySelectorAll('section').forEach(s => s.classList.remove('active'));

  // 진짜 인벤토리(.inventory-section)만 활성화
  const inv = document.querySelector('section.inventory-section#all-items');
  if (inv) inv.classList.add('active');

  // 타이틀 교체
  document.getElementById('inventory-title').textContent = title;

  // 사이드바 하이라이트
  document.querySelectorAll('#sidebar .menu-item').forEach(m => m.classList.remove('active'));
  el.classList.add('active');

  // 필터 세팅
  if (type === '즐겨찾기') labelFilter = 'favorite';
  else if (type === '임박') labelFilter = 'expiring';
  else labelFilter = 'all';
  storageFilter = ['냉동', '냉장', '실온'].includes(type) ? type : null;

  // 렌더
  renderItems();

  // 배지 업데이트
  const count = items.filter(item => {
    if (type === '즐겨찾기' && !item.favorite) return false;
    if (type === '임박' && !item.expiring) return false;
    if (['냉동', '냉장', '실온'].includes(type) && item.category !== type) return false;
    return true;
  }).length;
  document.getElementById('all-count').textContent = count;
}

function showAddForm() {
  const name = prompt("추가할 품목 이름을 입력하세요:");
  if (!name) return;
  const expire = prompt("유통기한을 YYYY-MM-DD 형식으로 입력하세요:");
  if (!expire) return;
  const category = prompt("분류를 입력하세요 (냉동, 냉장, 실온):");
  if (!category || !['냉동', '냉장', '실온'].includes(category)) {
    alert("올바른 분류를 입력해주세요.");
    return;
  }
  if (!confirm(`다음 정보로 항목을 추가하시겠습니까?\n이름: ${name}\n유통기한: ${expire}\n분류: ${category}`)) return;

  const newItem = {
    id: items.length ? items[items.length-1].id + 1 : 1,
    category, name, expire,
    favorite: false, expiring: false, done: false
  };
  items.push(newItem);
  renderItems();
}

function renderFilteredItems(type) {
  const container = document.getElementById("item-list");
  container.innerHTML = '';

  const filtered = items.filter(item => {
    if (type === null) return true;
    if (type === '즐겨찾기') return item.favorite;
    if (type === '임박') return item.expire && new Date(item.expire) <= new Date('2025-07-01');
    return item.category === type;
  });

  document.getElementById('item-count').innerText = `(${filtered.length})`;

  for (const item of filtered) {
    const card = document.createElement('div');
    card.className = 'item-card' + (item.done ? ' checked' : '');

    card.innerHTML = `
      <div style="display: flex; align-items: center; gap: 1rem;">
        <span style="cursor: pointer; font-size: 1.2rem;" onclick="toggleFavorite(${item.id})">${item.favorite ? '★' : '☆'}</span>
        <div>
          <div style="font-size: 0.8rem; color: #999;">${item.category}</div>
          <div style="font-weight: bold;">${item.name}</div>
          <div style="font-size: 0.85rem; color: ${item.expiring ? '#cc0000' : '#777'};">
            ${item.expiring ? '임박' : `~ ${item.expire}`}
          </div>
        </div>
      </div>
      <input type="checkbox" ${item.done ? 'checked' : ''} onclick="toggleDone(${item.id})"/>
    `;

    container.appendChild(card);
  }
}
// 1) 상단 메뉴 이동
function setupMainMenu() {
    document.querySelectorAll('.top-nav a').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        const page = a.dataset.page;       // e.g. data-page="main"
        navigateTo(page);
      });
    });
  }
  
  // 2) 사이드바 활성화 강조
  function highlightActiveSidebar(pageId) {
    document.querySelectorAll('#sidebar .label-item').forEach(el => {
      el.classList.toggle('active', el.dataset.section === pageId);
    });
  }
  
  // 3) 전체 등록 항목 수 표시
  function renderSidebarCounts() {
    document.querySelector('[data-section="all-items"] .count').innerText = items.length;
    // 같은 방식으로 다른 라벨에도 count 업데이트
  }
  
  // 4) 새 항목 추가 버튼 이동
  function setupAddButton() {
    document.querySelectorAll('.add-button').forEach(btn => {
      btn.addEventListener('click', () => navigateTo('add'));
    });
  }
  
  // 5) 검색 키워드로 리스트 필터링
  let currentSearch = '';
  function setupSearchInput() {
    document.querySelectorAll('.inventory-search').forEach(input => {
      input.addEventListener('input', () => {
        currentSearch = input.value.trim().toLowerCase();
        renderItems(currentSection());
      });
    });
  }
  
  // 6) 현재 페이지(전체/임박/즐겨찾기/카테고리)별 렌더
  function currentSection() {
    return document.querySelector('section.inventory-section:not(.hidden)').id;
  }
  function renderItems(sectionId) {
    let list = items;
  
    if (sectionId === 'expiring') {
        const today = new Date();
        list = list.filter(i => {
          // expires 포맷이 "YYYY.MM.DD" 라고 가정
          const [yy, mm, dd] = i.expires.split('.').map(Number);
          const expDate = new Date(yy, mm - 1, dd);
      
          // expDate - today 의 차이를 일수로 환산
          const diffDays = (expDate - today) / (1000 * 60 * 60 * 24);
          return diffDays >= 0 && diffDays <= 7;
        });
      }
      
     
    if (sectionId === 'favorites') {
      list = list.filter(i => i.favorite);
    }
    if (['frozen','refrigerated','room-temp'].includes(sectionId)) {
      list = list.filter(i => i.category === categoryMap[sectionId]);
    }
    if (currentSearch) {
      list = list.filter(i => i.name.toLowerCase().includes(currentSearch));
    }
  
    // 7)–11) row 생성
    const container = document.querySelector(`#${sectionId} .item-list`);
    container.innerHTML = '';
    list.forEach(i => {
      const row = document.createElement('div');
      row.className = 'item-card';
      row.innerHTML = `
        <span class="star">${i.favorite? '★':'☆'}</span>
        <div class="info">
          <div class="category">${i.category}</div>
          <div class="name">${i.name}</div>
          <div class="expires${sectionId==='expiring'? ' warning':''}">~ ${i.expires}</div>
        </div>
        <input type="checkbox" class="done-checkbox" ${i.done? 'checked':''}/>
      `;
      // 8) 즐겨찾기 토글
      row.querySelector('.star').addEventListener('click', () => {
        i.favorite = !i.favorite;
        renderItems(sectionId);
        renderSidebarCounts();
      });
      // 11) 체크박스 처리
      row.querySelector('.done-checkbox').addEventListener('change', e => {
        i.done = e.target.checked;
        if (i.done) {
          // 예: 삭제 대기 목록으로 이동
          removeFromCurrent(i.id);
        }
        renderItems(sectionId);
        renderSidebarCounts();
      });
      container.appendChild(row);
    });
  }
// === [추가] 검색 키워드 관리 기능 ===
const _KW_STORAGE = 'searchKeywords';

// 로컬스토리지 ↔ 키워드 리스트
function _getKws() {
  return JSON.parse(localStorage.getItem(_KW_STORAGE) || '[]');
}
function _saveKws(arr) {
  localStorage.setItem(_KW_STORAGE, JSON.stringify(arr));
}

// 키워드 렌더링 (필터링 적용)
function _renderKws(filter='') {
  const ul = document.getElementById('keyword-list');
  ul.innerHTML = '';
  _getKws()
    .filter(k => k.title.includes(filter))
    .forEach(k => {
      const li = document.createElement('li');
      li.className = 'keyword-item';
      li.innerHTML = `
        <div class="keyword-info">
          <span class="keyword-title">${k.title}</span>
          <span class="keyword-meta">${k.date}</span>
        </div>
        <button class="delete-keyword">✕</button>
      `;
      // 클릭 → 전체 목록 검색 적용
      li.querySelector('.keyword-info')
        .addEventListener('click', () => {
          navigateTo('all-items');
          document.getElementById('search-input').value = k.title;
          renderItems();
        });
      // 삭제
      li.querySelector('.delete-keyword')
        .addEventListener('click', e => {
          e.stopPropagation();
          _saveKws(_getKws().filter(x => x.id !== k.id));
          _renderKws(document.getElementById('keyword-input').value);
        });
      ul.appendChild(li);
    });
}

// 이벤트 바인딩
window.addEventListener('DOMContentLoaded', () => {
  // 검색 버튼 클릭 → 키워드 페이지로 이동
  document.querySelector('.search-button')?.addEventListener('click', () => {
    navigateTo('search-keywords');
    document.getElementById('keyword-input').value = '';
    _renderKws();
  });

  // + 버튼 → 새 키워드 추가
  document.getElementById('add-keyword-btn')
    .addEventListener('click', () => {
      const v = prompt('추가할 검색 키워드를 입력하세요:')?.trim();
      if (!v) return;
      const arr = _getKws();
      arr.unshift({ id: Date.now(), title: v, date: new Date().toISOString().slice(0,10).replace(/-/g,'.') });
      _saveKws(arr);
      _renderKws(document.getElementById('keyword-input').value);
    });

  // 입력 시 필터링
  document.getElementById('keyword-input')
    .addEventListener('input', e => _renderKws(e.target.value));

  // Enter → 바로 검색
  document.getElementById('keyword-input')
    .addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const kw = e.target.value.trim();
        if (!kw) return;
        navigateTo('all-items');
        document.getElementById('search-input').value = kw;
        renderItems();
      }
    });
});

  // 초기화
  function initApp() {
    setupMainMenu();
    setupAddButton();
    setupSearchInput();
    renderSidebarCounts();
    navigateTo('all-items');
  }
  initApp();

  // === [추가] “＋” → 추가 페이지, 입력값 저장 후 해당 목록으로 복귀 ===

// 1) 로컬스토리지에서 items 불러오기/저장
const _ITEMS_KEY = 'items';
function _loadItems() {
  return JSON.parse(localStorage.getItem(_ITEMS_KEY) || '[]');
}
function _saveItems(arr) {
  localStorage.setItem(_ITEMS_KEY, JSON.stringify(arr));
}

// 2) 페이지 전환: “＋” 클릭 시 add-item 페이지 열기
document.getElementById('open-add-btn')
  .addEventListener('click', () => {
    // 현재 보고 있던 필터(분류) 기억
    const currentCategory = storageFilter || 'all';
    // 이동
    navigateTo('add-item');
    // 기본값 세팅
    document.getElementById('item-category').value = currentCategory;
    document.getElementById('item-name').value = '';
    document.getElementById('item-expiry').value = '';
  });

// 3) Add 버튼 클릭 → 새 아이템 저장
document.getElementById('add-item-btn')
  .addEventListener('click', () => {
    const name = document.getElementById('item-name').value.trim();
    const type = document.getElementById('item-category').value;
    const date = document.getElementById('item-expiry').value;
    if (!name || !date) {
      alert('이름과 소비기한은 반드시 입력해야 합니다.');
      return;
    }
    // 새 아이템 객체
    const newItem = {
      id: Date.now(),
      name,
      type,
      expiry: date
    };
    // 저장
    const list = _loadItems();
    list.unshift(newItem);
    _saveItems(list);
    // 원래 보던 목록으로 돌아가서 렌더링
    const returnPage = (type === 'all') ? 'all-items' : type;
    navigateTo(returnPage);
    renderItems();
  });
