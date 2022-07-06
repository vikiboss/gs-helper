import { BiImport, BiExport } from "react-icons/Bi";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import D from "dayjs";
import React, { useEffect, useState } from "react";

import Button from "../../components/Button";
import CircleButton from "../../components/CircleButton";
import Loading from "../../components/Loading";
import nativeApi from "../../utils/nativeApi";
import Overview from "./Overview";
import Select from "../../components/Select";
import SelectButton from "../../components/SelectButton";
import useNotice from "../../hooks/useNotice";

import type { GachaData, GachaType, GachaItemType, StarType } from "../../../typings";

import styles from "./index.less";

const DefaultGachaData: GachaData = {
  info: {
    uid: "",
    lang: "zh-cn",
    export_app: "原神助手",
    export_app_version: "1.0.0",
    export_time: "",
    export_timestamp: "",
    update_time: "",
    uigf_version: "v2.2"
  },
  list: []
};

export const GachaMap: Record<GachaType, string> = {
  activity: "活动祈愿",
  weapon: "武器祈愿",
  normal: "常驻祈愿",
  newer: "新手祈愿"
};

export type FilterType = {
  gacha: GachaType[];
  item: GachaItemType[];
  star: StarType[];
};

const DefaultFilters: FilterType = {
  gacha: ["activity", "normal", "weapon", "newer"],
  item: ["weapon", "role"],
  star: [3, 4, 5]
};

const Gacha: React.FC = () => {
  const notice = useNotice();
  const navigate = useNavigate();
  const [type, setType] = useState<"overview" | "analysis" | "prediction">("overview");
  const [isWindows, setisWindows] = useState<boolean>(false);
  const [uid, setUid] = useState<string>("");
  const [filter, setfilter] = useState<FilterType>(DefaultFilters);
  const [gachas, setGachas] = useState<GachaData[]>([]);
  const [link, setLink] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const initGachaData = async (newUid?: string) => {
    const gachas: GachaData[] = await nativeApi.getLocalGachaDatas();
    setGachas(gachas);
    if (newUid) return setUid(newUid);
    const _uid: string = await nativeApi.getStoreKey("currentUid");
    const loggedUidGachaData = gachas.filter((e) => e.info.uid === _uid)[0];
    if (loggedUidGachaData) {
      setUid(_uid);
    } else if (gachas.length) {
      setUid(gachas[0].info.uid);
      if (_uid) {
        notice.warning({ message: "当前已登录 UID 的祈愿数据不存在，已自动切换到本地其他账号" });
      } else {
        notice.warning({ message: "未登录米游社账号，已自动选择本地首个账号的数据" });
      }
    }
  };

  useEffect(() => {
    (async () => {
      await initGachaData();
      const isWindows = (await nativeApi.getAppInfo()).isWindows;
      setisWindows(isWindows);
      if (isWindows) await getLocalGachaUrl();
    })();
  }, []);

  const updateGachaData = async () => {
    if (loading) return notice.faild({ message: "派蒙正在努力获取中，请不要重复点击啦！" });

    if (!link) {
      const msg = isWindows ?  "请先获取 「本地祈愿链接」 或手动输入祈愿链接" : "请先输入祈愿链接后再尝试获取数据";
      return notice.warning({ message: msg });
    }

    if (!link.match(/^https?:\/\//)) {
      return notice.faild({ message: "链接无效，请检查" });
    }

    notice.info({ message: "派蒙努力加载中，预计半分钟...", autoHide: false });

    setLoading(true);
    const data = await nativeApi.getGachaListByUrl(link);
    console.log("updateGachaData: ", data.list.length);

    if (data.list.length) {
      notice.success({ message: `更新完成，共获取到 ${data.list.length} 条数据` });
      await initGachaData(data.info.uid);
    } else {
      notice.faild({ message: "数据异常，请尝试重新获取 「最新链接」 后再试" });
    }
    setLoading(false);
  };

  const toggleFilter = (type: keyof FilterType, target?: any) => {
    if (!target) {
      const defaultFilter = DefaultFilters[type];
      const isAll = filter[type].length === defaultFilter.length;
      const res = isAll ? [] : defaultFilter;
      setfilter({ ...filter, [type]: res });
    } else {
      const types = new Set(filter[type] as any[]);
      const hasExist = types.has(target);
      types[hasExist ? "delete" : "add"](target);
      const res = Array.from(types);
      setfilter({ ...filter, [type]: res });
    }
  };

  const copyLink = () => {
    if (link) {
      nativeApi.writeClipboardText(link);
      notice.success({ message: "已将 「祈愿记录链接」 复制到剪切板" });
    } else {
      notice.faild({ message: " 「祈愿记录链接」 为空" });
    }
  };

  const getLocalGachaUrl = async (isUserTrriger: boolean = false) => {
    const url = await nativeApi.getGachaUrl();
    if (url) {
      setLink(url);
      if (isUserTrriger) notice.success({ message: "本地 「祈愿记录链接」 获取成功" });
    } else {
      const message = "本地日志中不存在有效链接，请先在游戏内打开 「祈愿历史记录」 后再尝试获取";
      if (isUserTrriger) notice.faild({ message });
    }
    return !!url;
  };

  const gacha = gachas.filter((e) => e.info.uid === uid)[0] || DefaultGachaData;
  const firsteDate = gacha.list.length ? gacha.list[0].time : "";
  const lastDate = gacha.list.length ? gacha.list[gacha.list.length - 1].time : "";
  const format = (str: string) => D(str).format("YYYY/M/D HH:mm");
  const dateRangeText = `${format(firsteDate)} ~ ${format(lastDate)}`;

  const handleImport = () => notice.warning({ message: "导入功能暂未开放" });
  const handleExport = () => notice.warning({ message: "导出功能暂未开放" });
  const handleBack = () => {
    if (loading) {
      notice.warning({ message: "请耐心等待数据加载完成" });
    } else {
      navigate("/");
    }
  };

  const loadingText = loading ? "派蒙努力加载中，预计半分钟..." : "派蒙没有找到任何数据";
  const tip = `※ 共加载了 ${gacha.list.length} 条数据（${dateRangeText}），数据同步存在延迟，请以游戏内为准。`;
  const uids = gachas.map((e) => e.info.uid).sort((p, n) => Number(p) - Number(n));

  const items = [
    { value: "overview", label: "总览" },
    { value: "analysis", label: "分析" },
    { value: "prediction", label: "预测" }
  ];

  const isEmpty = !loading && !gacha.info.uid;

  return (
    <>
      <div className={styles.container}>
        <CircleButton
          Icon={TiArrowBack}
          size='middle'
          className={styles.backBtn}
          onClick={handleBack}
        />
        <div className={styles.topZone}>
          <input
            value={link}
            onBlur={(e) => setLink(e.target.value.trim())}
            onChange={(e) => setLink(e.target.value)}
            placeholder='祈愿记录链接'
          />
          {isWindows && (
            <Button
              onClick={link ? copyLink : () => getLocalGachaUrl(true)}
              style={{ marginRight: "12px" }}
              text={link ? "复制" : "获取本地链接"}
            />
          )}
          <Button type='confirm' text='更新数据' onClick={updateGachaData} />
          <div className={styles.rightZone}>
            <SelectButton
              changeItem={setType}
              className={styles.selectBtn}
              items={items}
              value={type}
            />
            <div className={styles.icon} title='导入 JSON 数据' onClick={handleImport}>
              <BiImport size={20} />
            </div>
            {!isEmpty && (
              <div className={styles.icon} title='导出 JSON 数据' onClick={handleExport}>
                <BiExport size={20} />
              </div>
            )}
            {uids.length > 0 && uid && (
              <Select
                name='UID'
                onChange={(e) => setUid(e.target.value)}
                options={uids.map((e) => ({ value: e, label: e }))}
                title='切换 UID'
                value={uid}
              />
            )}
          </div>
        </div>
        {gacha.info.uid && !loading ? (
          type === "overview" && (
            <Overview gacha={gacha} filter={filter} notice={notice} toggleFilter={toggleFilter} />
          )
        ) : (
          <div style={{ display: "flex", flex: 1 }}>
            <Loading text={loadingText} isEmpty={isEmpty} />
          </div>
        )}
        {gacha.list.length > 0 && !loading && <span className={styles.dateTip}>{tip}</span>}
      </div>
      {notice.holder}
    </>
  );
};

export default Gacha;
