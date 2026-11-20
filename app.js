/* NDVM - Main Application Controller & Router */

function getContentEl() {
  return document.getElementById('content');
}

function getToggleEl() {
  return document.getElementById('menu-toggle');
}

function getDrawerEl() {
  return document.getElementById('menu-drawer');
}

function getOverlayEl() {
  return document.getElementById('menu-overlay');
}

function openMenu(open) {
  state.menuOpen = open;
  const toggle = getToggleEl();
  const drawer = getDrawerEl();
  const overlay = getOverlayEl();
  if (toggle) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.classList.toggle('active', open);
  }
  if (drawer) {
    drawer.setAttribute('aria-hidden', String(!open));
    drawer.classList.toggle('open', open);
  }
  if (overlay) overlay.hidden = !open;
  document.body.classList.toggle('menu-open', open);
}

function pageHtml(page) {
  switch (page) {
    case 'home': return homePage();
    case 'disaster': return mapPage();
    case 'map': return mapPage();
    case 'rainfall': return rainfallPage();
    case 'shelter': return shelterPage();
    case 'guide': return shelterPage();
    case 'stats': return statsPage();
    case 'about': return aboutPage();
    case 'action': return safetyPage();
    default: return homePage();
  }
}

function normalizePageId(page) {
  if (page === 'disaster') return 'map';
  if (page === 'guide') return 'shelter';
  if (page === 'help') return 'home';
  return page;
}

function navigate(page) {
  page = normalizePageId(page);
  if (!PAGES.some(x => x.id === page)) page = 'home';
  openMenu(false);
  if (location.hash !== '#' + page) {
    location.hash = page;
  } else {
    showPage(page);
  }
}

function showPage(page) {
  page = normalizePageId(page);
  state.page = page;
  const content = getContentEl();
  if (content) {
    content.innerHTML = pageHtml(page);
  }

  const drawerNav = document.getElementById('drawer-nav');
  if (drawerNav) {
    drawerNav.innerHTML = PAGES.map(item => `
      <button type="button" class="nav-item ${page === item.id ? 'active' : ''}" data-page="${item.id}" ${page === item.id ? 'aria-current="page"' : ''}>
        <span>${item.label}</span>
      </button>
    `).join('');
  }

  openMenu(false);
  if (typeof window.scrollTo === 'function') window.scrollTo(0, 0);

  // Trigger page-specific lifecycle hooks
  if (page === 'map') setTimeout(() => { if (typeof initNdvmMap === 'function') initNdvmMap(); }, 0);
  if (page === 'rainfall') setTimeout(() => { if (typeof window.ndvmInitRainfall === 'function') window.ndvmInitRainfall(); }, 0);
  if (page === 'stats') setTimeout(() => { if (typeof initNdvmStats === 'function') initNdvmStats(); }, 0);
  if (page === 'shelter') setTimeout(() => { if (typeof loadShelterStatus === 'function') loadShelterStatus(); }, 0);
  if (page === 'action' && typeof initSafetyPage === 'function') initSafetyPage();
}

// Global UI Event Listeners
document.addEventListener('click', event => {
  if (event.target.closest('#menu-toggle')) {
    openMenu(!state.menuOpen);
    return;
  }
  if (event.target.closest('#menu-close') || event.target.closest('#menu-overlay')) {
    openMenu(false);
    return;
  }

  const button = event.target.closest('button, a');
  if (!button) return;

  if (button.hasAttribute('data-page')) {
    event.preventDefault();
    navigate(button.getAttribute('data-page'));
    return;
  }

  if (button.hasAttribute('data-disaster')) {
    const chosen = button.getAttribute('data-disaster');
    state.disaster = chosen;
    state.mapDisaster = chosen;
    showPage(state.page);
    return;
  }

  if (button.hasAttribute('data-guide')) {
    state.guideIndex = Number(button.getAttribute('data-guide'));
    showPage(state.page);
    return;
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && state.menuOpen) openMenu(false);
});

window.addEventListener('hashchange', () => {
  let pageId = normalizePageId(location.hash.slice(1));
  showPage(PAGES.some(p => p.id === pageId) ? pageId : 'home');
});

// Robust Application Bootstrapping
function bootNdvm() {
  let initialPage = normalizePageId(location.hash.slice(1));
  showPage(PAGES.some(p => p.id === initialPage) ? initialPage : 'home');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootNdvm);
} else {
  bootNdvm();
}
