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
  form.innerHTML = `<label>食物<select id="mealFood">${Object.entries(foods).map(([id, food]) => `<option value="${id}">${food[0]}</option>`).join('')}</select></label><label>重量（g）<input id="mealWeight" type="number" min="1" value="100" required></label><p id="mealEstimate" class="muted"></p><button class="primary" type="submit">自动计算并加入</button>`;
  oldForm.replaceWith(form);
  const preview = () => {
    const food = foods[form.querySelector('#mealFood').value];
    const factor = Number(form.querySelector('#mealWeight').value || 0) / 100;
    form.querySelector('#mealEstimate').textContent = `约 ${Math.round(food[1] * factor)} kcal · 蛋白质 ${(food[2] * factor).toFixed(1)} g · 碳水 ${(food[3] * factor).toFixed(1)} g · 脂肪 ${(food[4] * factor).toFixed(1)} g`;
  };
  form.querySelector('#mealFood').addEventListener('change', preview);
  form.querySelector('#mealWeight').addEventListener('input', preview);
  form.addEventListener('submit', event => {
    event.preventDefault();
    const food = foods[form.querySelector('#mealFood').value];
    const grams = Number(form.querySelector('#mealWeight').value);
    if (!Number.isFinite(grams) || grams <= 0) return;
    const factor = grams / 100;
    const state = JSON.parse(localStorage.getItem(key) || '{}');
    const meal = { name: `${food[0]} ${Math.round(grams)}g`, calories: Math.round(food[1] * factor), protein: Number((food[2] * factor).toFixed(1)) };
    state.meals = state.meals || [];
    state.meals.push(meal);
    state.calories = (state.calories || 0) + meal.calories;
    state.protein = (state.protein || 0) + meal.protein;
    state.carbs = (state.carbs || 0) + Math.round(food[3] * factor);
    state.fat = (state.fat || 0) + Math.round(food[4] * factor);
    localStorage.setItem(key, JSON.stringify(state));
    location.reload();
  });
  preview();
  document.addEventListener('click', event => {
    if (event.target.closest('[data-font]')) setTimeout(() => location.reload(), 0);
  }, true);
})();
