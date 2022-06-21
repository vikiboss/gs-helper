import { API_YS_CONTENT } from "../constants";
import request from "../utils/request";

import type { BaseRes } from "../typings";

interface PublicRoleListData {
  total: number;
  list: PublicRoleRaw[];
}

interface PublicRoleRaw {
  contentId: string;
  channelId: string[];
  title: string;
  author: string | null;
  type: string | null;
  tag: string | null;
  intro: string | null;
  url: string | null;
  ext: Ext[];
  start_time: string;
  id: string;
}

interface Ext {
  arrtName: string;
  keyId: number;
  value: ExtValue[] | string;
}

interface ExtValue {
  name: string;
  url: string;
  uid?: number;
  status?: string;
}

/** CV 声优信息 */
export interface CV {
  /** 声优名字 */
  name: string;
  /** 声优语言 */
  type: string;
  /** 声优音频链接 */
  vos: string[];
}

/** 角色信息 */
export interface PublicRole {
  /** 名称 */
  name: string;
  /** 简介 */
  introduction: string;
  /** 发布时间 */
  startTime: string;
  /** 台词 */
  line: string;
  /** 配音 CV */
  CVs: CV[];
}

/** 将获取的信息处理成需要的信息字段 PublicRoleRaw => PublicRole */
const getNeededRoleInfo = (publicRoles: PublicRoleRaw[] = []): PublicRole[] => {
  const res = [];
  for (const role of publicRoles) {
    const _role: PublicRole = {
      name: role.title,
      startTime: role.start_time,
      introduction: "",
      line: "",
      CVs: []
    };

    for (const e of role.ext) {
      const type = e.arrtName.split("-")[1] || "";
      if (type === "简介") {
        _role.introduction = (e.value as string)
          .replace(/<p(.*?)>/g, "")
          .replace(/<\/p>/g, "")
          .replace(/<br \/>/g, "")
          .replace(/\n/g, "")
          .replace(/&(.*?);/g, "");
        continue;
      }
      if (type === "台词") {
        _role.line = (e.value as ExtValue[])[0]?.url;
        continue;
      }

      if (type === "音频语言") {
        if (!_role.CVs.length) {
          _role.CVs = (e.value as string).split("/").map((e) => ({ name: "", type: e, vos: [] }));
        } else {
          const langs = (e.value as string).split("/");
          for (const [k, v] of langs.entries()) _role.CVs[k].type = v;
        }
        continue;
      }

      if (type.startsWith("声优")) {
        const indexs = type.replace("声优", "").split("-");
        const i = Number(indexs[0]) - 1 || 0;
        if (!_role.CVs[i]) _role.CVs[i] = { name: "", type: "", vos: [] };
        _role.CVs[i].name = _role.CVs[i].name ? _role.CVs[i].name : (e.value as string);
        continue;
      }

      if (type.startsWith("音频")) {
        const indexs = type.replace("音频", "").split("-");
        const i = Number(indexs[0]) - 1 || 0;
        if (!_role.CVs[i]) _role.CVs[i] = { name: "", type: "", vos: [] };
        _role.CVs[i].vos.push(e.value as string);
        continue;
      }
    }
    res.push(_role);
  }

  return res;
};

const getPublicRoleList = async (): Promise<PublicRole[] | null> => {
  const url = `${API_YS_CONTENT}/ysCn/getContentList`;
  const params = { pageSize: 1000, pageNum: 1, channelId: 152 };
  const { status, data } = await request.get<BaseRes<PublicRoleListData>>(url, { params });
  const isOK = status === 200 && data.retcode === 0;
  if (!isOK) console.log("getBBSSignInfo: ", data);
  const res = getNeededRoleInfo(data?.data?.list);
  return isOK ? (res.length ? res : null) : null;
};

export default getPublicRoleList;
