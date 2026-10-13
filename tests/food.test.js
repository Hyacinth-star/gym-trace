const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const source = fs.readFileSync('dist/fixes.js', 'utf8');
function setup(language = 'en') {
  let saved = { nutritionDate: require('../dist/nutrition.js').localDate(), streakVersion: 3, settings: { language }, meals: [], calories: 10, protein: 2, carbs: 3, fat: 4 };
  let reloads = 0;
  const fields = {};
  const get = selector => fields[selector] ||= { value: '', addEventListener(type, handler) { this[type] = handler; } };
  const form = { querySelector: get, querySelectorAll: () => ['Name', 'Calories', 'Protein', 'Carbs', 'Fat'].map(x => get('#customMeal' + x)), reportValidity: () => true, addEventListener(type, handler) { this[type] = handler; } };
  get('#mealFood').value = 'chicken'; get('#mealWeight').value = '100';
  vm.runInNewContext(source, { NutritionDates: require('../dist/nutrition.js'), document: { querySelector: () => ({ cloneNode: () => form, replaceWith() {} }) }, localStorage: { getItem: () => JSON.stringify(saved), setItem: (_, value) => saved = JSON.parse(value) }, location: { reload: () => reloads++ } });
  return { form, get, saved: () => saved, reloads: () => reloads, submit: () => form.submit({ preventDefault() {} }) };
}
for (const language of ['en', 'ja', 'zh-Hant']) {
  const app = setup(language);
  app.get('#mealFood').value = 'custom'; app.get('#mealFood').change();
  assert.equal(app.get('#customMealFields').hidden, false);
  assert.equal(app.get('#mealWeight').disabled, true);
  assert.equal(app.get('#customMealCalories').disabled, false);
  app.get('#customMealName').value = 'My lunch';
  ['Calories', 'Protein', 'Carbs', 'Fat'].forEach((field, index) => app.get('#customMeal' + field).value = ['250', '20.5', '30', '5'][index]);
  app.submit();
  assert.deepEqual(app.saved().meals[0], { name: 'My lunch', calories: 250, protein: 20.5, carbs: 30, fat: 5 });
  assert.equal(app.saved().calories, 260); assert.equal(app.saved().protein, 22.5);
  assert.equal(app.saved().carbs, 33); assert.equal(app.saved().fat, 9);
  assert.equal(app.reloads(), 1);
  app.get('#mealFood').value = 'chicken'; app.get('#mealFood').change();
  assert.equal(app.get('#customMealFields').hidden, true);
  assert.equal(app.get('#customMealCalories').disabled, true);
  assert.equal(app.get('#mealWeight').disabled, false);
  app.get('#mealWeight').value = '200'; app.submit();
  assert.equal(app.saved().meals[1].calories, 330);
  assert.equal(app.saved().meals[1].protein, 62);
}
const invalid = setup();
invalid.get('#mealFood').value = 'custom';
invalid.get('#customMealName').value = 'Invalid';
invalid.get('#customMealCalories').value = '-1';
invalid.submit();
assert.equal(invalid.saved().meals.length, 0);
assert.equal(invalid.reloads(), 0);
console.log('Food mode switching, custom nutrition storage, totals, validation and preset regression passed');
