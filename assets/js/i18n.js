const getI18nPath = () => {
  const page = document.body.dataset.page || 'home';
  return page === 'home' ? 'i18n.json' : '../i18n.json';
};

const applyTranslations = (lang, translations, toggle) => {
  const dict = translations[lang] || translations.zh;
  document.documentElement.setAttribute('lang', lang === 'en' ? 'en' : 'zh-CN');
  document.body.dataset.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  document.querySelectorAll('[data-i18n-attr-content]').forEach((el) => {
    const key = el.dataset.i18nAttrContent;
    if (dict[key]) {
      el.setAttribute('content', dict[key]);
    }
  });

  document.querySelectorAll('[data-i18n-attr-aria-label]').forEach((el) => {
    const key = el.dataset.i18nAttrAriaLabel;
    if (dict[key]) {
      el.setAttribute('aria-label', dict[key]);
    }
  });

  document.querySelectorAll('[data-i18n-attr-alt]').forEach((el) => {
    const key = el.dataset.i18nAttrAlt;
    if (dict[key]) {
      el.setAttribute('alt', dict[key]);
    }
  });

  if (toggle) {
    const labelKey = 'nav.langToggle';
    if (dict[labelKey]) {
      toggle.textContent = dict[labelKey];
    }
    const ariaLabelKey = 'nav.langToggleLabel';
    if (dict[ariaLabelKey]) {
      toggle.setAttribute('aria-label', dict[ariaLabelKey]);
    }
  }

  localStorage.setItem('site-lang', lang);
};

const initI18n = async () => {
  const toggle = document.getElementById('languageToggle');
  const stored = localStorage.getItem('site-lang');
  const defaultLang = document.body.dataset.lang || 'zh';
  const initialLang = stored || defaultLang;

  let translations = null;
  try {
    const response = await fetch(getI18nPath());
    translations = await response.json();
  } catch (error) {
    console.warn('Unable to load translations', error);
    return;
  }

  applyTranslations(initialLang, translations, toggle);

  if (toggle) {
    toggle.addEventListener('click', () => {
      const nextLang = document.body.dataset.lang === 'en' ? 'zh' : 'en';
      applyTranslations(nextLang, translations, toggle);
    });
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initI18n);
} else {
  initI18n();
}
