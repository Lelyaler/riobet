document.addEventListener('DOMContentLoaded', () => {
  const sliderTrack = document.getElementById('heroSliderTrack');
  const prevBtn = document.getElementById('heroSliderPrev');
  const nextBtn = document.getElementById('heroSliderNext');
  const pagination = document.getElementById('heroSliderPagination');
  if (sliderTrack && prevBtn && nextBtn) {
    const slides = sliderTrack.querySelectorAll('.hero-slider__slide');
    const segments = pagination
      ? pagination.querySelectorAll('.hero-slider__segment')
      : [];
    let currentIndex = 0;
    let autoSlideInterval = null;
    const updateSlider = () => {
      sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
      segments.forEach((seg, index) => {
        if (index === currentIndex) {
          seg.classList.add('active');
        } else {
          seg.classList.remove('active');
        }
      });
    };
    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlider();
    };
    const prevSlide = () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlider();
    };
    const startAutoSlide = () => {
      stopAutoSlide();
      autoSlideInterval = setInterval(nextSlide, 5000);
    };
    const stopAutoSlide = () => {
      if (autoSlideInterval) clearInterval(autoSlideInterval);
    };
    const resetAutoSlide = () => {
      startAutoSlide();
    };
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoSlide();
    });
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoSlide();
    });
    segments.forEach((seg, index) => {
      seg.addEventListener('click', () => {
        currentIndex = index;
        updateSlider();
        resetAutoSlide();
      });
    });
    updateSlider();
    startAutoSlide();
  }
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.classList.toggle('menu-open');
    });
    document.querySelectorAll('.mobile-drawer__link').forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.classList.remove('menu-open');
      });
    });
  }
  const faqButtons = document.querySelectorAll('.faq__button');
  faqButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const faqItem = button.parentElement;
      const faqPanel = button.nextElementSibling;
      const isOpen = faqItem.classList.contains('active');
      document.querySelectorAll('.faq__item').forEach((item) => {
        item.classList.remove('active');
        const panel = item.querySelector('.faq__panel');
        if (panel) {
          panel.style.maxHeight = null;
        }
        const btn = item.querySelector('.faq__button');
        if (btn) {
          btn.setAttribute('aria-expanded', 'false');
        }
      });
      if (!isOpen && faqPanel) {
        faqItem.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
        faqPanel.style.maxHeight = faqPanel.scrollHeight + 'px';
      }
    });
  });
  const loadMoreBtn = document.getElementById('loadMoreSlotsBtn');
  if (loadMoreBtn) {
    let isSlotsExpanded = false;
    loadMoreBtn.addEventListener('click', () => {
      isSlotsExpanded = !isSlotsExpanded;
      const extraSlots = document.querySelectorAll('.slot-card.slot-card--extra');
      extraSlots.forEach((slot) => {
        if (isSlotsExpanded) {
          slot.classList.remove('slot-card--hidden');
        } else {
          slot.classList.add('slot-card--hidden');
        }
      });
      if (isSlotsExpanded) {
        loadMoreBtn.textContent = 'СВЕРНУТЬ';
        loadMoreBtn.classList.add('expanded');
      } else {
        loadMoreBtn.textContent = 'СМОТРЕТЬ ВСЕ ИГРЫ';
        loadMoreBtn.classList.remove('expanded');
      }
    });
  }
  const tocList = document.getElementById('tocList');
  const tocToggleBtn = document.getElementById('tocToggleBtn');
  function formatHeadingText(str) {
    if (!str) return '';
    let text = str.trim();
    if (text === text.toUpperCase()) {
      text = text.toLowerCase();
      text = text.charAt(0).toUpperCase() + text.slice(1);
    }
    text = text
      .replace(/риобет/gi, 'Риобет')
      .replace(/рио бет/gi, 'Рио Бет')
      .replace(/riobet/gi, 'RioBet')
      .replace(/андроид/gi, 'Андроид')
      .replace(/снг/gi, 'СНГ');
    return text;
  }
  if (tocList) {
    const headings = Array.from(
      new Set(
        document.querySelectorAll(
          '.article-section h1, .article-section h2, .article-section h3, .faq h2'
        )
      )
    );
    if (headings.length > 0) {
      tocList.innerHTML = '';
      headings.forEach((heading, index) => {
        if (!heading.id) {
          heading.id = 'heading-sec-' + (index + 1);
        }
        const li = document.createElement('li');
        li.className = 'toc__item';
        if (index >= 5) {
          li.classList.add('hidden-toc__item');
          li.style.display = 'none';
        }
        const formattedTitle = formatHeadingText(heading.textContent);
        const a = document.createElement('a');
        a.href = '#' + heading.id;
        a.className = 'toc__link';
        a.innerHTML = `<span class="toc__num">${index + 1}.</span> ${formattedTitle}`;
        a.addEventListener('click', (e) => {
          e.preventDefault();
          const targetEl = document.getElementById(heading.id);
          if (targetEl) {
            const yOffset = -80;
            const y =
              targetEl.getBoundingClientRect().top +
              window.pageYOffset +
              yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        });
        li.appendChild(a);
        tocList.appendChild(li);
      });
      if (headings.length > 5 && tocToggleBtn) {
        tocToggleBtn.style.display = 'inline-flex';
        let isTocExpanded = false;
        tocToggleBtn.addEventListener('click', () => {
          isTocExpanded = !isTocExpanded;
          const hiddenItems = tocList.querySelectorAll('.hidden-toc__item');
          hiddenItems.forEach((item) => {
            if (isTocExpanded) {
              item.style.display = 'block';
            } else {
              item.style.display = 'none';
            }
          });
          if (isTocExpanded) {
            tocToggleBtn.classList.add('expanded');
          } else {
            tocToggleBtn.classList.remove('expanded');
          }
        });
      } else if (tocToggleBtn) {
        tocToggleBtn.style.display = 'none';
      }
    }
  }
  const liveCasinoBtn = document.getElementById('liveCasinoDropdownBtn');
  const liveCasinoMenu = document.getElementById('liveCasinoDropdownMenu');
  if (liveCasinoBtn && liveCasinoMenu) {
    liveCasinoBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      liveCasinoBtn.classList.toggle('open');
      liveCasinoMenu.classList.toggle('show');
    });
    document.addEventListener('click', (e) => {
      if (
        !liveCasinoBtn.contains(e.target) &&
        !liveCasinoMenu.contains(e.target)
      ) {
        liveCasinoBtn.classList.remove('open');
        liveCasinoMenu.classList.remove('show');
      }
    });
  }
  const copyPromoBtn = document.getElementById('copyPromoBtn');
  const promoCodeVal = document.getElementById('promoCodeVal');
  const promoTermsToggle = document.getElementById('promoTermsToggle');
  const promoTermsPanel = document.getElementById('promoTermsPanel');
  if (copyPromoBtn && promoCodeVal) {
    copyPromoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const codeText = promoCodeVal.textContent.trim();
      const origHTML = copyPromoBtn.innerHTML;
      const doCopy = () => {
        copyPromoBtn.classList.add('copied');
        copyPromoBtn.innerHTML = '<span class="promo-card__code" style="border-bottom:none;font-size:22px;">✓</span>';
        setTimeout(() => {
          copyPromoBtn.classList.remove('copied');
          copyPromoBtn.innerHTML = origHTML;
        }, 2000);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(codeText).then(doCopy).catch(() => fallbackCopy(codeText, doCopy));
      } else {
        fallbackCopy(codeText, doCopy);
      }
    });
  }
  function fallbackCopy(text, callback) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    if (callback) callback();
  }
  if (promoTermsToggle && promoTermsPanel) {
    promoTermsToggle.addEventListener('click', () => {
      const isHidden = promoTermsPanel.style.display === 'none';
      promoTermsPanel.style.display = isHidden ? 'block' : 'none';
      promoTermsToggle.querySelector('.promo-card__plus').textContent = isHidden ? '−' : '+';
    });
  }
});
