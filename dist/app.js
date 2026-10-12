const key = 'burnfit-data-v1';
const initial = { workoutDone:false, workouts:2, streak:6, calories:620, protein:42, carbs:78, fat:18, meals:[{name:'燕麦酸奶杯',calories:340,protein:20},{name:'美式咖啡',calories:20,protein:0}], weights:[68.9,68.8,68.8,68.7,68.6,68.5,68.4] };
let state = JSON.parse(localStorage.getItem(key) || 'null') || structuredClone(initial);
const $ = s => document.querySelector(s);
const save = () => localStorage.setItem(key, JSON.stringify(state));
function num(n){return Math.round(n).toLocaleString('zh-CN')}
function render(){
  $('#streakValue').textContent=state.streak; $('#workoutProgress').textContent=state.workoutDone?'1 / 1':'0 / 1';
  $('#workoutStatus').textContent=state.workoutDone?'已完成':'待开始'; $('#workoutStatus').classList.toggle('done',state.workoutDone);
  $('#completeWorkout').textContent=state.workoutDone?'今日训练已完成':'完成训练'; $('#completeWorkout').disabled=state.workoutDone;
  $('#calorieRemaining').textContent=num(Math.max(0,2100-state.calories)); $('#proteinValue').textContent=state.protein;
  $('#ringCalories').textContent=num(state.calories); $('#macroProtein').textContent=`${state.protein} / 120 g`; $('#macroCarbs').textContent=`${state.carbs} / 230 g`; $('#macroFat').textContent=`${state.fat} / 65 g`;
  $('#mealCount').textContent=`${state.meals.length} 餐`; $('#mealList').innerHTML=state.meals.map(m=>`<li><span>${m.name}<small>蛋白质 ${m.protein} g</small></span><b>${m.calories} kcal</b></li>`).join('');
  $('#weeklyWorkouts').textContent=state.workouts; const latest=state.weights.at(-1); $('#latestWeight').textContent=`${latest.toFixed(1)} kg`; $('#weightInput').value=latest.toFixed(1);
  const min=Math.min(...state.weights)-.15,max=Math.max(...state.weights)+.15; $('#weightChart').innerHTML=state.weights.map((w,i)=>`<span class="bar ${i===state.weights.length-1?'current':''}" title="${w.toFixed(1)} kg" style="height:${35+((w-min)/(max-min))*55}%"></span>`).join('');
  $('#weekList').innerHTML=[['周一','下肢力量 A',state.workoutDone],['周二','轻松步行',true],['周三','上肢力量 A',false],['周四','休息 / 拉伸',false],['周五','全身力量 B',false],['周六','自由活动',false],['周日','休息',false]].map(x=>`<div class="week-item ${x[2]?'done':''}"><span class="day">${x[0]}</span><span class="activity">${x[1]}</span><span>${x[2]?'✓':'○'}</span></div>`).join('');
  $('#coachTitle').textContent=state.workoutDone?'训练完成，安排一餐恢复':'先完成训练，再补一餐蛋白质'; $('#coachAdvice').textContent=state.workoutDone?'今天的计划已完成。接下来补足蛋白质并好好休息，恢复也是训练的一部分。':'你昨天已完成饮食记录。今天的训练计划已排好，完成后可用一份酸奶或鸡胸肉补足蛋白质。'; save();
}
function completeWorkout(){if(!state.workoutDone){state.workoutDone=true;state.workouts++;state.streak++;render()}}
document.querySelectorAll('[data-view]').forEach(btn=>btn.onclick=()=>{document.querySelectorAll('.view,.nav-link').forEach(x=>x.classList.remove('active')); $('#'+btn.dataset.view).classList.add('active'); btn.classList.add('active');window.scrollTo({top:0,behavior:'smooth'})});
document.querySelectorAll('[data-view-target]').forEach(btn=>btn.onclick=()=>document.querySelector(`[data-view="${btn.dataset.viewTarget}"]`).click());
$('#completeWorkout').onclick=completeWorkout; $('#workoutQuickComplete').onclick=completeWorkout;
$('#workoutForm').onsubmit=e=>{e.preventDefault();$('#workoutSaved').textContent=`已保存：RPE ${$('#rpe').value}。干得漂亮！`;};
$('#mealForm').onsubmit=e=>{e.preventDefault();const meal={name:$('#mealName').value.trim(),calories:Number($('#mealCalories').value),protein:Number($('#mealProtein').value)};state.meals.push(meal);state.calories+=meal.calories;state.protein+=meal.protein;state.carbs+=Math.round(meal.calories*.11);state.fat+=Math.round(meal.calories*.025);e.target.reset();$('#mealSaved').textContent='已加入今日饮食记录。';render();};
$('#addWeightButton').onclick=()=>$('#weightDialog').showModal(); $('#weightForm').onsubmit=e=>{e.preventDefault();const val=Number($('#weightInput').value);if(val){state.weights=[...state.weights.slice(-6),val];$('#weightDialog').close();render();}};
$('#resetData').onclick=()=>{if(confirm('恢复演示数据？你当前的本地记录将被覆盖。')){state=structuredClone(initial);render();}};
const days=['周日','周一','周二','周三','周四','周五','周六']; const d=new Date();$('#todayDate').textContent=`${days[d.getDay()]} · ${d.getMonth()+1}月${d.getDate()}日`;render();
