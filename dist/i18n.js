(() => {
  const key = 'burnfit-data-v1';
  const common = {
    '燃点健身': ['BurnFit', 'BurnFit'], '恢复演示数据': ['Reset demo data', 'デモをリセット'],
    '今天，离目标更近一点': ['One step closer to your goal.', '今日も、目標に一歩近づこう。'], '把注意力放在下一件该做的小事上。': ['Focus on the next small thing you can do.', '次にできる小さな一歩に集中しましょう。'],
    '连续记录': ['Streak', '連続記録'], '今日目标进度': ['Today’s goals', '今日の目標'], '完成今天的训练计划': ['Complete today’s workout plan', '今日のトレーニング計画を完了'], '今日剩余': ['remaining today', '今日の残り'], '优先保证恢复': ['Prioritize recovery', '回復を優先'], '较上周平均': ['vs. last week', '先週比'], '本周体重': ['Weekly weight', '今週の体重'], '今日训练': ['Today’s workout', '今日のトレーニング'], '待开始': ['Not started', '未開始'], '待開始': ['Not started', '未開始'], '已完成': ['Completed', '完了'], '完成训练': ['Complete workout', 'トレーニング完了'], '今日训练已完成': ['Workout completed', '完了しました'], '行动建议': ['Next step', '次のアクション'], '先完成訓練，再補一餐蛋白質': ['Train first, then add protein.', 'まずトレーニング、その後たんぱく質を。'], '計劃完全由你決定；完成後，記得以蛋白質與睡眠協助恢復。': ['Your plan is yours. Support recovery with protein and sleep.', '計画はあなた次第。たんぱく質と睡眠で回復を支えましょう。'],
    '訓練計劃': ['Workout plan', 'トレーニング計画'], '自己的計劃，自己排': ['Build your own plan.', '自分の計画を作ろう。'], '标记今日完成': ['Mark today complete', '今日を完了にする'], '本周安排': ['This week', '今週の予定'], '點選某一天即可編輯計劃': ['Select a day to edit its plan.', '曜日を選択して計画を編集します。'], '休息 / 未安排': ['Rest / not scheduled', '休息 / 未設定'], '編輯': ['Edit', '編集'], '自訂訓練日': ['Custom workout day', 'カスタム日'], '建立你的計劃': ['Build your plan', '計画を作成'], '安排在': ['Day', '曜日'], '計劃名稱': ['Plan name', '計画名'], '選擇動作': ['Exercise', '種目を選択'], '自訂動作': ['Custom exercise', 'カスタム種目'], '組數': ['Sets', 'セット'], '次數 / 時間': ['Reps / time', '回数 / 時間'], '加入動作': ['Add exercise', '種目を追加'], '移除': ['Remove', '削除'], '儲存本日計劃': ['Save plan', '計画を保存'], '訓練記錄': ['Workout log', 'トレーニング記録'], '主觀難度 RPE': ['Difficulty RPE', '主観的強度 RPE'], '完成情況': ['Completion', '完了状況'], '訓練備註': ['Notes', 'メモ'], '保存訓練記錄': ['Save workout log', '記録を保存'],
    '饮食记录': ['Food log', '食事記録'], '吃得清楚，练得踏实': ['Eat clearly. Train confidently.', '食べて、強くなる。'], '今日营养预算': ['Today’s nutrition', '今日の栄養'], '添加一餐': ['Add food', '食事を追加'], '食物': ['Food', '食品'], '重量（g）': ['Weight (g)', '重量（g）'], '自动计算并加入': ['Calculate & add', '自動計算して追加'], '约 ': ['About ', '約 '], '蛋白质': ['Protein', 'たんぱく質'], '蛋白質': ['Protein', 'たんぱく質'], '碳水': ['Carbs', '炭水化物'], '脂肪': ['Fat', '脂質'], '今天吃了什么': ['Today’s food', '今日の食事'], '餐': [' meals', '食'],
    '进展追踪': ['Progress', '進捗'], '慢一点，但持续向前': ['Slowly, consistently forward.', 'ゆっくり、着実に前へ。'], '记录体重': ['Log weight', '体重を記録'], '体重趋势': ['Weight trend', '体重の推移'], '日移动平均': ['-day moving average', '日移動平均'], '上周': ['Last week', '先週'], '今天': ['Today', '今日'], '本周总结': ['Weekly summary', '今週のまとめ'], '你正在稳定前进': ['You are making steady progress', '着実に進んでいます'], '次训练完成': [' workouts completed', '回トレーニング完了'], '饮食目标达成': ['nutrition goal reached', '栄養目標を達成'], '体重周均变化': ['weekly weight change', '週平均の体重変化'], '建议：下周保持当前热量与训练频率，不需要额外收紧饮食。': ['Keep your current calories and training frequency next week.', '来週も現在のカロリーと頻度を維持しましょう。'],
    '個人化': ['Personalization', 'パーソナライズ'], '語言': ['Language', '言語'], '字體': ['Typeface', '書体'], '頁面主題色': ['Accent color', 'テーマカラー'], '調整語言、字體與主題色，立刻預覽你的選擇。': ['Choose your language, typeface, and accent color.', '言語、書体、テーマカラーを選択できます。'], '系統預設': ['System default', 'システム標準'], '圓潤現代': ['Rounded modern', '丸みのあるモダン'], '優雅襯線': ['Elegant serif', 'エレガントな明朝'], '清晰、俐落': ['Clear and crisp', 'すっきりと読みやすい'], '柔和、易讀': ['Soft and readable', 'やわらかく読みやすい'], '沉穩、有個性': ['Refined and distinctive', '上品で個性的'], '蘋果藍': ['Apple blue', 'アップルブルー'], '薰衣草紫': ['Lavender', 'ラベンダー'], '森林綠': ['Forest green', 'フォレストグリーン'], '暖陽橙': ['Warm orange', 'ウォームオレンジ'],
    '周一': ['Mon', '月'], '周二': ['Tue', '火'], '周三': ['Wed', '水'], '周四': ['Thu', '木'], '周五': ['Fri', '金'], '周六': ['Sat', '土'], '周日': ['Sun', '日'], '組': ['sets', 'セット'], '秒': ['sec', '秒'],
    '下肢力量 A': ['Lower Body A', '下半身 A'], '上肢力量 A': ['Upper Body A', '上半身 A'], '全身力量 B': ['Full Body B', '全身 B'], '杠铃深蹲': ['Barbell Squat', 'バーベルスクワット'], '罗马尼亚硬拉': ['Romanian Deadlift', 'ルーマニアンデッドリフト'], '保加利亚分腿蹲': ['Bulgarian Split Squat', 'ブルガリアンスクワット'], '平板支撑': ['Plank', 'プランク'], '硬拉': ['Deadlift', 'デッドリフト'], '卧推': ['Bench Press', 'ベンチプレス'], '哑铃划船': ['Dumbbell Row', 'ダンベルロー'], '引体向上': ['Pull-up', '懸垂'], '箭步蹲': ['Lunge', 'ランジ'], '肩推': ['Shoulder Press', 'ショルダープレス'], '全部完成': ['Completed all', 'すべて完了'], '部分完成': ['Partially completed', '一部完了'], '調整後完成': ['Completed with changes', '調整して完了'], '白米饭': ['Cooked rice', 'ご飯'], '鸡胸肉': ['Chicken breast', '鶏むね肉'], '鸡蛋': ['Egg', '卵'], '燕麦': ['Oats', 'オーツ麦'], '香蕉': ['Banana', 'バナナ'], '三文鱼': ['Salmon', 'サーモン'], '西兰花': ['Broccoli', 'ブロッコリー'], '自訂計劃': ['Custom plan', 'カスタム計画'], '個動作': ['exercises', '種目']
  };
  const language = () => JSON.parse(localStorage.getItem(key) || '{}').settings?.language;
  let translating = false;
  const translate = () => {
    const lang = language(); const column = lang === 'en' ? 0 : lang === 'ja' ? 1 : -1;
    if (column < 0 || translating) return;
    translating = true; document.documentElement.lang = lang;
    const entries = Object.entries(common).sort((a, b) => b[0].length - a[0].length);
    const walk = node => {
      if (node.nodeType === Node.TEXT_NODE) { let text = node.nodeValue; entries.forEach(([from, words]) => { text = text.replaceAll(from, words[column]); }); node.nodeValue = text; }
      else if (node.nodeType === Node.ELEMENT_NODE && !['SCRIPT', 'STYLE'].includes(node.tagName)) [...node.childNodes].forEach(walk);
    };
    walk(document.body); translating = false;
  };
  translate();
  new MutationObserver(() => queueMicrotask(translate)).observe(document.body, { childList: true, subtree: true, characterData: true });
  document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => setTimeout(translate, 0)));
})();
