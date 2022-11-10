// 凌晨、早上、上午、中午、下午、傍晚（黄昏）、晚上、午夜
const GreetingMsgMap: Record<string, string> = {
  wee: '凌晨了，早点休息喵！',
  morning: '早上好，今天也是元气慢慢的一天呢!',
  forenoon: '上午好，打起精神来！',
  noon: '到饭点了，吃了吗？没吃吃我一记喵喵拳（）',
  afternoon: '下午好，午睡完也要充满干劲喵！',
  dusk: '五点了，忙完记得吃饭喵~',
  night: '晚上好，今天又到哪去冒险了呢？',
  midnight: '夜深了，晚安喵，又是充实的一天呢！',
  unknown: '很高兴见到你。'
}

// 凌晨、早上、上午、中午、下午、傍晚（黄昏）、晚上、午夜
const GreetingShortMsgMap: Record<string, string> = {
  wee: '凌晨了',
  morning: '早上好',
  forenoon: '上午好',
  noon: '中午好',
  afternoon: '下午好',
  dusk: '傍晚了',
  night: '晚上好',
  midnight: '夜深了',
  unknown: '你好'
}

/** 按小时获取时间段 */
const getPeriodByHour = (hour: number) => {
  if (hour >= 1 && hour < 5) {
    return 'wee'
  }
  if (hour >= 5 && hour < 8) {
    return 'morning'
  }
  if (hour >= 8 && hour < 11) {
    return 'forenoon'
  }
  if (hour >= 11 && hour < 13) {
    return 'noon'
  }
  if (hour >= 13 && hour < 17) {
    return 'afternoon'
  }
  if (hour >= 17 && hour < 18) {
    return 'dusk'
  }
  if (hour >= 18 && hour < 23) {
    return 'night'
  }
  if (hour === 23 || hour === 0) {
    return 'midnight'
  }
  return 'unknown'
}

/** 按时间获取当前时间段的打招呼消息 */
const getGreetingMsg = (date: Date = new Date(), short = false) => {
  const hour = date.getHours()
  const period = getPeriodByHour(hour)
  return (short ? GreetingMsgMap : GreetingShortMsgMap)[period]
}

export default getGreetingMsg
