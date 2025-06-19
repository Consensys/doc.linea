(function () {
  function updateClearButtonVisibility() {
    const input = document.querySelector('input[aria-label="Search"]');
    const clearButton = document.querySelector('[class*="searchClearButton"]');
    if (!input || !clearButton) return;

    const isExpanded = input.getAttribute('aria-expanded') === 'true';
    const hasText = input.value.trim() !== '';

    if (isExpanded && hasText) {
      clearButton.classList.remove('hide-x-button');
    } else {
      clearButton.classList.add('hide-x-button');
    }
  }

  const observer = new MutationObserver(() => {
    // ⏱ Delay longer to give React enough time to update input value
    setTimeout(updateClearButtonVisibility, 200);
  });

  const interval = setInterval(() => {
    const input = document.querySelector('input[aria-label="Search"]');
    if (input) {
      observer.observe(input, { attributes: true, attributeFilter: ['aria-expanded'] });
      input.addEventListener('input', updateClearButtonVisibility);
      updateClearButtonVisibility(); // Initial sync
      clearInterval(interval);
    }
  }, 200);
})();