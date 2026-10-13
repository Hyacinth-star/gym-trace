(function (root) {
  const nutrients = ['calories', 'protein', 'carbs', 'fat'];
  function localDate(now = new Date()) {
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  }
  function rollover(data, today = localDate()) {
    data.nutritionHistory ||= {};
    if (data.nutritionDate === today) return false;
    if ((data.meals || []).length || nutrients.some(key => data[key] > 0)) {
      data.nutritionHistory[data.nutritionDate || 'undated'] = {
        meals: structuredClone(data.meals || []),
        ...Object.fromEntries(nutrients.map(key => [key, data[key] || 0]))
      };
    }
    data.nutritionDate = today;
    data.meals = [];
    nutrients.forEach(key => data[key] = 0);
    return true;
  }
  root.NutritionDates = { localDate, rollover };
  if (typeof module !== 'undefined') module.exports = root.NutritionDates;
})(globalThis);
