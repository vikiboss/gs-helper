import request from '../utils/request'

const HitokotoApi = 'https://v1.hitokoto.cn/'

const getHitokoto = async () => {
  try {
    const config = { params: { encode: 'text' } }

    const { status, data } = await request.get<string>(HitokotoApi, config)

    return status === 200 ? data : '出错啦，待会儿再试试吧'
  } catch {
    return '出错啦，待会儿再试试吧'
  }
}

export default getHitokoto
