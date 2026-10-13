(() => {
  const words = {
    en: ['Food history', 'Select date', 'Earlier records (date unknown)', 'No food recorded on this date.', 'Calories', 'Protein', 'Carbs', 'Fat', 'Records reset daily using your device’s local date. Earlier records are kept below.'],
    ja: ['食事履歴', '日付を選択', '以前の記録（日付不明）', 'この日の食事記録はありません。', 'カロリー', 'たんぱく質', '炭水化物', '脂質', '端末の現地日付で毎日切り替わります。過去の記録は下に保存されます。'],
    'zh-Hant': ['飲食歷史', '選擇日期', '舊記錄（日期不詳）', '這一天沒有飲食記錄。', '熱量', '蛋白質', '碳水', '脂肪', '按裝置的本地日期每日更新，過往記錄保留在下方。']
  }[state.settings.language] || [];
  const panel = document.createElement('article');
  panel.className = 'panel meal-history';
  panel.innerHTML = `<h2>${words[0]}</h2><p class="muted">${words[8]}</p><label>${words[1]}<input type="date" id="nutritionHistoryDate"></label><select id="nutritionHistoryPicker" aria-label="${words[1]}"></select><div id="nutritionHistoryDetail"></div>`;
  document.querySelector('#nutrition').append(panel);
  const date = panel.querySelector('#nutritionHistoryDate');
  const picker = panel.querySelector('#nutritionHistoryPicker');
  const detail = panel.querySelector('#nutritionHistoryDetail');
  const amount = value => typeof value === 'number' ? Number(value.toFixed(1)) : '—';
  function show(day) {
    const record = day === state.nutritionDate ? state : state.nutritionHistory?.[day];
    detail.replaceChildren();
    if (!record || !record.meals?.length) { detail.textContent = words[3]; return; }
    const totals = document.createElement('p');
    totals.textContent = ['calories', 'protein', 'carbs', 'fat'].map((key, i) => `${words[4 + i]}: ${amount(record[key])} ${i ? 'g' : 'kcal'}`).join(' · ');
    detail.append(totals);
    const list = document.createElement('ul');
    for (const meal of record.meals) {
      const item = document.createElement('li');
      item.textContent = `${meal.name} — ${['calories', 'protein', 'carbs', 'fat'].map((key, i) => `${words[4 + i]}: ${amount(meal[key])} ${i ? 'g' : 'kcal'}`).join(' · ')}`;
      list.append(item);
    }
    detail.append(list);
  }
  function refresh() {
    const selected = date.value || state.nutritionDate;
    picker.replaceChildren();
    for (const day of [state.nutritionDate, ...Object.keys(state.nutritionHistory || {}).filter(day => day !== state.nutritionDate).sort().reverse()]) {
      const option = document.createElement('option'); option.value = day;
      option.textContent = day === 'undated' ? words[2] : day;
      picker.append(option);
    }
    date.value = selected; picker.value = selected; show(selected);
  }
  date.addEventListener('change', () => { picker.value = date.value; show(date.value); });
  picker.addEventListener('change', () => { date.value = picker.value === 'undated' ? '' : picker.value; show(picker.value); });
  function checkDate() {
    if (NutritionDates.rollover(state)) { render(); refresh(); }
  }
  // Timers can pause in sleeping/background tabs, so also check on return and interaction.
  setInterval(checkDate, 1000);
  window.addEventListener('focus', checkDate);
  document.addEventListener('visibilitychange', checkDate);
  document.addEventListener('click', checkDate, true);
  refresh();
})();
