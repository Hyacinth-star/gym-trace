const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
let update;
let progress;
const calories = { textContent: '0' };
vm.runInNewContext(fs.readFileSync('dist/presentation.js', 'utf8'), {
  document: { querySelector: selector => selector === '#ringCalories' ? calories : { style: { setProperty: (_, value) => progress = value } } },
  MutationObserver: class { constructor(callback) { update = callback; } observe() {} }
});
assert.equal(progress, '0%');
calories.textContent = '420'; update(); assert.equal(progress, '20%');
calories.textContent = '2,100'; update(); assert.equal(progress, '100%');
calories.textContent = '2600'; update(); assert.equal(progress, '100%');
calories.textContent = '0'; update(); assert.equal(progress, '0%');
console.log('Nutrition ring reflects empty, partial, full and reset days');
