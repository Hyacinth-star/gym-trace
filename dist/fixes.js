(() => {
  const key = 'burnfit-data-v1';
  let data = JSON.parse(localStorage.getItem(key) || 'null');
  if (data && data.streakVersion !== 2) {
    data.streak = 0; data.workouts = 0; data.workoutDone = false; data.completedDates = []; data.streakVersion = 2;
    localStorage.setItem(key, JSON.stringify(data));
    location.reload();
    return;
  }

  const foods = {
    chicken: {name:'鸡胸肉', kcal:165, protein:31, carbs:0, fat:3.6}, rice: {name:'白米饭', kcal:130, protein:2.4, carbs:28, fat:.3},
    egg: {name:'鸡蛋', kcal:143, protein:13, carbs:.7, fat:9.5}, oats: {name:'燕麦', kcal:389, protein:17, carbs:66, fat:7},
    banana: {name:'香蕉', kcal:89, protein:1.1, carbs:23, fat:.3}, salmon: {name:'三文鱼', kcal:208, protein:20, carbs:0, fat:13}, broccoli: {name:'西兰花', kcal:34, protein:2.8, carbs:7, fat:.4}
  };
  const old = document.querySelector('#mealForm');
  if (old) {
    const form = old.cloneNode(false);
    form.id = 'mealForm'; form.className = 'meal-form';
    form.innerHTML = '<label>食物<select id="mealFood">' + Object.entries(foods).map(([id, f]) => `<option value="${id}">${f.name}</option>`).join('') + '</select></label><label>重量<input id="mealWeight" type="number" min="1" value="100" required /> g</label><p id="mealEstimate" class="muted"></p><button class="primary" type="submit">自动计算并加入</button>';
    old.replaceWith(form);
    const estimate = () => { const f = foods[form.querySelector('#mealFood').value], w = Number(form.querySelector('#mealWeight').value || 0) / 100; document.querySelector('#mealEstimate').textContent = `约 ${Math.round(f.kcal*w)} kcal · 蛋白质 ${(f.protein*w).toFixed(1)} g · 碳水 ${(f.carbs*w).toFixed(1)} g · 脂肪 ${(f.fat*w).toFixed(1)} g`; };
    form.querySelector('#mealFood').onchange = estimate; form.querySelector('#mealWeight').oninput = estimate; estimate();
    form.onsubmit = e => { e.preventDefault(); const f = foods[form.querySelector('#mealFood').value], w = Number(form.querySelector('#mealWeight').value) / 100; const saved = JSON.parse(localStorage.getItem(key)); const meal = {name:`${f.name} ${Math.round(w*100)}g`, calories:Math.round(f.kcal*w), protein:+(f.protein*w).toFixed(1)}; saved.meals.push(meal); saved.calories += meal.calories; saved.protein += meal.protein; saved.carbs += Math.round(f.carbs*w); saved.fat += Math.round(f.fat*w); localStorage.setItem(key, JSON.stringify(saved)); location.reload(); };
  }
  const words = {en:{'今日':'Today','训练':'Workout','饮食':'Nutrition','进展':'Progress','設定':'Settings','個人化':'Personalization','語言':'Language','字體':'Typeface','頁面主題色':'Accent color','添加一餐':'Add a meal','今天吃了什么':'Today’s food','自动计算并加入':'Calculate & add','连续记录':'Streak','今日训练':'Today’s workout','本周安排':'This week','體重趨勢':'Weight trend'},ja:{'今日':'今日','训练':'トレーニング','饮食':'食事','进展':'進捗','設定':'設定','個人化':'パーソナライズ','語言':'言語','字體':'書体','頁面主題色':'テーマカラー','添加一餐':'食事を追加','今天吃了什么':'今日の食事','自动计算并加入':'自動計算して追加','连续记录':'連続記録','今日训练':'今日のトレーニング','本周安排':'今週の予定','體重趨勢':'体重の推移'}};
  const translate = () => { const lang = JSON.parse(localStorage.getItem(key) || '{}').settings?.language; const dict = words[lang]; if (!dict) return; const walk = n => { if (n.nodeType === 3) { const t = n.nodeValue.trim(); if (dict[t]) n.nodeValue = n.nodeValue.replace(t, dict[t]); } else if (n.nodeType === 1 && !['SCRIPT','STYLE'].includes(n.tagName)) [...n.childNodes].forEach(walk); }; walk(document.body); };
  translate(); document.querySelectorAll('[data-language]').forEach(b => b.addEventListener('click', () => setTimeout(translate, 0)));
})();
