const en = {
  header: {
    onboardingTitle: 'Did You Do It?',
    tasksTitle: 'Tasks',
    progressTitle: 'Growth Journey',
  },
  nav: {
    tasks: 'Tasks',
    progress: 'Progress',
  },
  onboarding1: {
    phase: 'Phase 1',
    titleLine1: 'What goal do you',
    titleLine2: 'want to achieve?',
    tip: "It can't be like 'earn 1 million'. You could say you want to be a blogger, learn English, or fitness.",
    placeholder: 'I want to...',
    hint: 'Be specific, be radiant.',
    next: 'Next',
  },
  onboarding2: {
    phase: 'Phase 2',
    title: 'Micro-habit',
    titleLine2: 'Breakdown',
    label: 'Choose a suggested micro-action or write your own:',
    placeholder: 'Or type your own...',
    aiSuggesting: 'AI is thinking...',
    aiError: 'Failed to load suggestions',
    retry: 'Retry',
    tipsTitle: 'Tips',
    tipsLoading: 'Loading tips...',
    tipsRefresh: 'Refresh',
    defaultTips: [
      { title: 'The Science of Small', body: 'Growth happens in tiny moments. The smaller the habit, the harder to fail.' },
      { title: 'Stack Your Habits', body: 'Attach new habits to existing ones. After I [current habit], I will [new habit].' },
      { title: '2-Minute Rule', body: 'Any new habit should take less than 2 minutes when you first start.' },
      { title: 'Never Miss Twice', body: "Missing once is an accident. Missing twice is the start of a new (bad) habit." },
    ],
    next: 'Next',
  },
  onboarding3: {
    title: 'What time of day do you plan to do this?',
    subtitle: "Choose a time you can actually stick to. Don't pick a time when you might be too busy.",
    hour: 'Hour',
    min: 'Min',
    morningTitle: 'Morning Routine',
    morningSub: 'Best for focus habits',
    nightTitle: 'Night Reflection',
    nightSub: 'Best for relaxing habits',
    start: 'Start Habit',
  },
  dashboard: {
    todayFocus: "Today's Focus",
    fallbackAction: 'Stand for 5 minutes',
    dayStreak: 'Day Streak',
    reminder: 'Reminder',
    done: 'DONE',
    checkIn: 'CHECK IN',
    motiveLine1: 'Be firm with yourself.',
    motiveLine2: 'Did you actually do it?',
    weeklyFlow: 'Weekly Flow',
    consistency: '85% Consistency',
  },
  progress: {
    momentum: 'Current Momentum',
    dayStreak: 'Day Streak',
    topAchiever: "You're in the top 5% of achievers this week.",
    monthlyProgress: 'Monthly Progress',
    october: 'October 2023',
    consistencyLabel: 'Consistency',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    totalAchievements: 'Total Achievements',
    thisMonth: '+12 this month',
    evolvedState: 'Evolved State',
    xpToNext: '240 XP to next level',
    adjustGoal: 'Adjust & Evolve Goal',
  },
};

interface TipItem {
  title: string;
  body: string;
}

export interface Translations {
  header: { onboardingTitle: string; tasksTitle: string; progressTitle: string };
  nav: { tasks: string; progress: string };
  onboarding1: { phase: string; titleLine1: string; titleLine2: string; tip: string; placeholder: string; hint: string; next: string };
  onboarding2: { phase: string; title: string; titleLine2: string; label: string; placeholder: string; aiSuggesting: string; aiError: string; retry: string; tipsTitle: string; tipsLoading: string; tipsRefresh: string; defaultTips: TipItem[]; next: string };
  onboarding3: { title: string; subtitle: string; hour: string; min: string; morningTitle: string; morningSub: string; nightTitle: string; nightSub: string; start: string };
  dashboard: { todayFocus: string; fallbackAction: string; dayStreak: string; reminder: string; done: string; checkIn: string; motiveLine1: string; motiveLine2: string; weeklyFlow: string; consistency: string };
  progress: { momentum: string; dayStreak: string; topAchiever: string; monthlyProgress: string; october: string; consistencyLabel: string; days: string[]; totalAchievements: string; thisMonth: string; evolvedState: string; xpToNext: string; adjustGoal: string };
}

const zh: Translations = {
  header: {
    onboardingTitle: '你做到了吗？',
    tasksTitle: '任务',
    progressTitle: '成长之旅',
  },
  nav: {
    tasks: '任务',
    progress: '进度',
  },
  onboarding1: {
    phase: '第 1 步',
    titleLine1: '你想达成什么',
    titleLine2: '目标？',
    tip: '不能是"赚一百万"这种。你可以说想成为博主、学英语、或者健身。',
    placeholder: '我想要...',
    hint: '越具体越好。',
    next: '下一步',
  },
  onboarding2: {
    phase: '第 2 步',
    title: '微习惯',
    titleLine2: '拆解',
    label: '选择 AI 推荐的微行动，或自定义：',
    placeholder: '或者自己输入...',
    aiSuggesting: 'AI 思考中...',
    aiError: '加载建议失败',
    retry: '重试',
    tipsTitle: '小贴士',
    tipsLoading: '加载中...',
    tipsRefresh: '换一批',
    defaultTips: [
      { title: '微小的科学', body: '成长发生在微小的瞬间。习惯越小，越不容易失败。' },
      { title: '习惯叠加', body: '把新习惯附加到已有习惯上。做完[已有习惯]后，我就[新习惯]。' },
      { title: '两分钟法则', body: '任何新习惯刚开始时都应该在两分钟内完成。' },
      { title: '绝不连续错过', body: '错过一次是意外，连续错过两次就是新（坏）习惯的开始。' },
    ],
    next: '下一步',
  },
  onboarding3: {
    title: '你打算在每天什么时间做这件事？',
    subtitle: '选一个你真正能坚持的时间，别挑可能太忙的时段。',
    hour: '时',
    min: '分',
    morningTitle: '晨间习惯',
    morningSub: '适合专注类习惯',
    nightTitle: '夜间反思',
    nightSub: '适合放松类习惯',
    start: '开始习惯',
  },
  dashboard: {
    todayFocus: '今日聚焦',
    fallbackAction: '站立 5 分钟',
    dayStreak: '天连续',
    reminder: '提醒',
    done: '已完成',
    checkIn: '打卡',
    motiveLine1: '对自己严格一点。',
    motiveLine2: '你真的做到了吗？',
    weeklyFlow: '本周趋势',
    consistency: '85% 完成率',
  },
  progress: {
    momentum: '当前势头',
    dayStreak: '天连续',
    topAchiever: '你本周排名前 5%，继续保持！',
    monthlyProgress: '月度进展',
    october: '2023 年 10 月',
    consistencyLabel: '完成率',
    days: ['一', '二', '三', '四', '五', '六', '日'],
    totalAchievements: '总成就',
    thisMonth: '本月 +12',
    evolvedState: '进化状态',
    xpToNext: '距下一级还需 240 XP',
    adjustGoal: '调整并进化目标',
  },
};

const zhHant: Translations = {
  header: {
    onboardingTitle: '你做到了嗎？',
    tasksTitle: '任務',
    progressTitle: '成長之旅',
  },
  nav: {
    tasks: '任務',
    progress: '進度',
  },
  onboarding1: {
    phase: '第 1 步',
    titleLine1: '你想達成什麼',
    titleLine2: '目標？',
    tip: '不能是「賺一百萬」這種。你可以說想成為部落客、學英文、或是健身。',
    placeholder: '我想要...',
    hint: '越具體越好。',
    next: '下一步',
  },
  onboarding2: {
    phase: '第 2 步',
    title: '微習慣',
    titleLine2: '拆解',
    label: '選擇 AI 推薦的微行動，或自訂：',
    placeholder: '或者自己輸入...',
    aiSuggesting: 'AI 思考中...',
    aiError: '載入建議失敗',
    retry: '重試',
    tipsTitle: '小貼士',
    tipsLoading: '載入中...',
    tipsRefresh: '換一批',
    defaultTips: [
      { title: '微小的科學', body: '成長發生在微小的瞬間。習慣越小，越不容易失敗。' },
      { title: '習慣疊加', body: '把新習慣附加到已有習慣上。做完[已有習慣]後，我就[新習慣]。' },
      { title: '兩分鐘法則', body: '任何新習慣剛開始時都應該在兩分鐘內完成。' },
      { title: '絕不連續錯過', body: '錯過一次是意外，連續錯過兩次就是新（壞）習慣的開始。' },
    ],
    next: '下一步',
  },
  onboarding3: {
    title: '你打算在每天什麼時間做這件事？',
    subtitle: '選一個你真正能堅持的時間，別挑可能太忙的時段。',
    hour: '時',
    min: '分',
    morningTitle: '晨間習慣',
    morningSub: '適合專注類習慣',
    nightTitle: '夜間反思',
    nightSub: '適合放鬆類習慣',
    start: '開始習慣',
  },
  dashboard: {
    todayFocus: '今日聚焦',
    fallbackAction: '站立 5 分鐘',
    dayStreak: '天連續',
    reminder: '提醒',
    done: '已完成',
    checkIn: '打卡',
    motiveLine1: '對自己嚴格一點。',
    motiveLine2: '你真的做到了嗎？',
    weeklyFlow: '本週趨勢',
    consistency: '85% 完成率',
  },
  progress: {
    momentum: '當前勢頭',
    dayStreak: '天連續',
    topAchiever: '你本週排名前 5%，繼續保持！',
    monthlyProgress: '月度進展',
    october: '2023 年 10 月',
    consistencyLabel: '完成率',
    days: ['一', '二', '三', '四', '五', '六', '日'],
    totalAchievements: '總成就',
    thisMonth: '本月 +12',
    evolvedState: '進化狀態',
    xpToNext: '距下一級還需 240 XP',
    adjustGoal: '調整並進化目標',
  },
};

export type Lang = 'en' | 'zh' | 'zhHant';

const _en: Translations = en;
export const locales: Record<Lang, Translations> = { en: _en, zh, zhHant };

export const langLabels: Record<Lang, string> = {
  en: 'EN',
  zh: '简体',
  zhHant: '繁體',
};
