list API ：https://ys.mihoyo.com/content/ysCn/getContentList?pageSize=1000&pageNum=1&channelId=152
content API ：https://ys.mihoyo.com/content/ysCn/getContent?contentId=16496

const res = {
SLIDER: {
HOME_BIG: 6,
HOME_SMALL: 7,
EVENT: 257
},
NEWS: {
TOP_GRID: 259, // 最新资讯
LATEST: 10,
NOTICE: 12
},
MANGA: {
CHAPTERS: 15
},
MAP: { // https://ys.mihoyo.com/content/ysCn/getContent?contentId=16496
LIST: 206
},
APPOINTMENT: {
QUESTIONNARIE: 123
},
CONFIG: {
SOCIAL: 488,
CITY: 212 // 获取所有区域
},
COMPANY: {
AGREEMENT: 214,
PRIVACY: 215
},
CHARACTER: {
DETAIL: 152, // 所有
MONDSTADT: 150, // 蒙德
LIYUE: 151, // 璃月
INAZUMA: 324 // 稻妻
},
NOTE: {
MONDSTADT: 163,
LIYUE: 164,
INAZUMA: 325
}
};

当前开放的区域 data.list[i].contentId

https://ys.mihoyo.com/content/ysCn/getContentList?pageSize=1000&pageNum=1&channelId=206
https://ys.mihoyo.com/content/ysCn/getContentList?pageSize=1000&pageNum=1&order=asc&channelId=152
https://ys.mihoyo.com/content/ysCn/getContent?contentId=16496
https://upload-bbs.mihoyo.com/game_record/genshin/character_icon/UI_AvatarIcon_Lisa.png
https://upload-bbs.mihoyo.com/game_record/genshin/character_side_icon/UI_AvatarIcon_Side_Ambor.png
