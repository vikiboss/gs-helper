import type { GachaData } from "../../../../typings";

export const Colors: Record<string, string> = {
  blue: "#73abcd",
  purple: "#9779c2",
  golden: "#ffa564",
  red: "#da4e55"
};

const n5 = {
  id: "5星",
  label: "5星",
  value: 0,
  color: Colors.golden
};

const n4 = {
  id: "4星",
  label: "4星",
  value: 0,
  color: Colors.purple
};

const n3 = {
  id: "3星",
  label: "3星",
  value: 0,
  color: Colors.blue
};

const transformGachaDataType = (list: GachaData["list"]) => {
  [n5, n4, n3].forEach((e) => (e.value = 0));
  for (const item of list) {
    if (item.rank_type === "5") n5.value++;
    if (item.rank_type === "4") n4.value++;
    if (item.rank_type === "3") n3.value++;
  }
  return [n3, n4, n5];
};

export default transformGachaDataType;
