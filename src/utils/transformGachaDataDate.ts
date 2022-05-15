import { GachaData } from "../typings";

const transformGachaDataDate = (gacha: GachaData) => {
  const dateMap = new Map<string, number>();
  for (const item of gacha.list) {
    const date = item.time.slice(0, 10);
    dateMap.set(date, dateMap.has(date) ? dateMap.get(date) + 1 : 1);
  }
  const res = [] as { day: string; value: number }[];
  dateMap.forEach((v, k) => res.push({ day: k, value: v }));
  return res;
};

export default transformGachaDataDate;
