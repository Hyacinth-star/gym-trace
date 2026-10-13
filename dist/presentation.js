(() => {
  // The ring represents the recorded intake, including an empty day.
  const calories = document.querySelector('#ringCalories');
  const ring = document.querySelector('.calorie-ring');
  const update = () => {
    const value = Number(calories.textContent.replace(/,/g, '')) || 0;
    ring.style.setProperty('--nutrition-progress', `${Math.min(100, Math.max(0, value / 2100 * 100))}%`);
  };
  update();
  new MutationObserver(update).observe(calories, { childList: true, characterData: true, subtree: true });
})();
