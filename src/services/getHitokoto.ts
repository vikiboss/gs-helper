import { request } from '../utils/request'

const HitokotoApi = 'https://v1.hitokoto.cn/?c=a&c=b&c=c&c=d&c=e&c=i'

export async function getHitokoto() {
  try {
    const { status, data } = await request.get<any>(HitokotoApi)

    return status === 200 ? `${data.hitokoto} ——「${data.from}」` : '出错啦，待会儿再试试吧'
  } catch {
    return '出错啦，待会儿再试试吧'
  }
}
