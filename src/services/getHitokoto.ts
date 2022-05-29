import request from "../utils/request";

const HitokotoApi = "https://v1.hitokoto.cn/";

const getHitokoto = async () => {
  try {
    const { data, status } = await request.get(HitokotoApi, { params: { encode: "text" } });
    return status === 200 ? data : "出错啦，待会儿再试试吧";
  } catch {
    return "出错啦，待会儿再试试吧";
  }
};

export default getHitokoto;
