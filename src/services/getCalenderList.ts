import { API_STATIC } from '../constants';
import request from '../utils/request';

import type { BaseRes } from '../typings';

export interface CalenderData {
  list: CalenderEvent[];
}

export interface CalenderEvent {
  /** 生日与限时活动0，武器突破材料1，角色天赋突破材料2 */
  break_type: string;
  /** 限时活动1，突破材料（武器和角色天赋）2，生日4 */
  kind: string;
  /** 图片链接，仅材料有效 */
  img_url: string;
  /** 开始时间 */
  start_time: string;
  /** 结束时间 */
  end_time: string;
  /** 具体材料信息 */
  contentInfos: ContentInfo[];
  /** 材料所在秘境 */
  contentSource: ContentSource[];
  /** 掉落星期数组 */
  drop_day: string[];

  content_id: string;
  font_color: string;
  id: string;
  jump_type: string;
  jump_url: string;
  padding_color: string;
  sort: string;
  style: string;
  title: string;
}

export interface ContentInfo {
  /** 材料名称 */
  title: string;
  /** 材料 icon 链接 */
  icon: string;

  bbs_url: string;
  content_id: number;
}

export interface ContentSource {
  /** 秘境名称 */
  title: string;
  /** 秘境 icon 链接 */
  icon: string;

  bbs_url: string;
  content_id: number;
}

const getCalenderList = async (): Promise<CalenderEvent[] | null> => {
  const url = `${API_STATIC}/common/blackboard/ys_obc/v1/get_activity_calendar`;

  const { status, data } = await request.get<BaseRes<CalenderData>>(url, {
    params: { app_sn: 'ys_obc' },
  });

  const isOK = status === 200 && data.retcode === 0;

  if (!isOK) {
    console.log('getBBSSignInfo: ', data);
  }

  return isOK ? data?.data?.list || null : null;
};

export default getCalenderList;
