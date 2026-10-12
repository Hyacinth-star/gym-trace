const fs = require('fs');
const html = fs.readFileSync('dist/index.html', 'utf8');
const js = fs.readFileSync('dist/app.js', 'utf8');
const css = fs.readFileSync('dist/styles.css', 'utf8');
function assert(condition, message) { if (!condition) throw new Error(message); }
assert(html.includes('id="mealForm"'), 'meal logging form should exist');
assert(html.includes('id="weightDialog"'), 'weight dialog should exist');
assert(js.includes('localStorage.setItem'), 'progress must persist locally');
assert(js.includes('function completeWorkout'), 'workout completion flow should exist');
assert(js.includes('state.meals.push'), 'meal submission must add a meal');
assert(css.includes('@media(max-width:760px)'), 'layout needs mobile styles');
console.log('Static product checks passed');
