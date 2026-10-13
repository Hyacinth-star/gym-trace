(() => {
  const key = 'burnfit-data-v1';
  const data = JSON.parse(localStorage.getItem(key) || 'null');
  if (data && data.streakVersion !== 3) {
    Object.assign(data, { streak: 0, workouts: 0, workoutDone: false, completedDates: [], streakVersion: 3 });
    localStorage.setItem(key, JSON.stringify(data));
    location.reload();
    return;
  }
  const foods = {
    chicken: ['鸡胸肉', 165, 31, 0, 3.6], rice: ['白米饭', 130, 2.4, 28, 0.3], egg: ['鸡蛋', 143, 13, 0.7, 9.5], oats: ['燕麦', 389, 17, 66, 7], banana: ['香蕉', 89, 1.1, 23, 0.3], salmon: ['三文鱼', 208, 20, 0, 13], broccoli: ['西兰花', 34, 2.8, 7, 0.4]
  };
  const oldForm = document.querySelector('#mealForm');
  if (!oldForm) return;
  const form = oldForm.cloneNode(false);
  const labels = {
    en: ['Custom', 'Food name', 'Calories (kcal)', 'Protein (g)', 'Carbs (g)', 'Fat (g)', 'Enter totals for this serving.', 'Add food', 'Calculate & add'],
    ja: ['カスタム', '食品名', 'カロリー（kcal）', 'たんぱく質（g）', '炭水化物（g）', '脂質（g）', '今回食べた分の合計を入力してください。', '食事を追加', '自動計算して追加'],
    'zh-Hant': ['自定義', '食物名稱', '熱量（kcal）', '蛋白質（g）', '碳水（g）', '脂肪（g）', '請填寫這一份食物的營養總量。', '加入記錄', '自动计算并加入']
  }[data?.settings?.language || 'zh-Hant'];
  form.innerHTML = `<label>食物<select id="mealFood">${Object.entries(foods).map(([id, food]) => `<option value="${id}">${food[0]}</option>`).join('')}<option value="custom">${labels[0]}</option></select></label><label id="mealWeightField">重量（g）<input id="mealWeight" type="number" min="1" value="100" required></label><div id="customMealFields" hidden><p class="muted">${labels[6]}</p><label>${labels[1]}<input id="customMealName" maxlength="120" required disabled></label>${['Calories', 'Protein', 'Carbs', 'Fat'].map((field, i) => `<label>${labels[i + 2]}<input id="customMeal${field}" type="number" min="0" step="any" required disabled></label>`).join('')}</div><p id="mealEstimate" class="muted"></p><button id="mealSubmit" class="primary" type="submit">${labels[8]}</button>`;
  oldForm.replaceWith(form);
  const preview = () => {
    const custom = form.querySelector('#mealFood').value === 'custom';
    form.querySelector('#customMealFields').hidden = !custom;
    form.querySelector('#mealWeightField').hidden = custom;
    form.querySelector('#mealWeight').disabled = custom;
    form.querySelectorAll('#customMealFields input').forEach(input => input.disabled = !custom);
    form.querySelector('#mealEstimate').hidden = custom;
    form.querySelector('#mealSubmit').textContent = labels[custom ? 7 : 8];
    if (custom) return;
    const food = foods[form.querySelector('#mealFood').value];
    const factor = Number(form.querySelector('#mealWeight').value || 0) / 100;
    form.querySelector('#mealEstimate').textContent = `约 ${Math.round(food[1] * factor)} kcal · 蛋白质 ${(food[2] * factor).toFixed(1)} g · 碳水 ${(food[3] * factor).toFixed(1)} g · 脂肪 ${(food[4] * factor).toFixed(1)} g`;
  };
  form.querySelector('#mealFood').addEventListener('change', preview);
  form.querySelector('#mealWeight').addEventListener('input', preview);
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    let meal;
    if (form.querySelector('#mealFood').value === 'custom') {
      const name = form.querySelector('#customMealName').value.trim();
      const values = ['Calories', 'Protein', 'Carbs', 'Fat'].map(field => Number(form.querySelector('#customMeal' + field).value));
      if (!name || values.some(value => !Number.isFinite(value) || value < 0)) return;
      meal = { name, calories: values[0], protein: values[1], carbs: values[2], fat: values[3] };
    } else {
      const food = foods[form.querySelector('#mealFood').value];
      const grams = Number(form.querySelector('#mealWeight').value);
      if (!food || !Number.isFinite(grams) || grams <= 0) return;
      const factor = grams / 100;
      meal = { name: `${food[0]} ${Math.round(grams)}g`, calories: Math.round(food[1] * factor), protein: Number((food[2] * factor).toFixed(1)), carbs: Math.round(food[3] * factor), fat: Math.round(food[4] * factor) };
    }
    const state = JSON.parse(localStorage.getItem(key) || '{}');
    NutritionDates.rollover(state);
    state.meals = state.meals || [];
    state.meals.push(meal);
    state.calories = (state.calories || 0) + meal.calories;
    state.protein = (state.protein || 0) + meal.protein;
    state.carbs = (state.carbs || 0) + meal.carbs;
    state.fat = (state.fat || 0) + meal.fat;
    localStorage.setItem(key, JSON.stringify(state));
    location.reload();
  });
  preview();
})();
