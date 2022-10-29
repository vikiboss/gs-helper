import { BiImport, BiExport } from 'react-icons/bi';
import { TiArrowBack } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import D from 'dayjs';
import React, { useEffect, useState } from 'react';

import Data from './components/Data';
import Button from '../../components/Button';
import CircleButton from '../../components/CircleButton';
import Loading from '../../components/Loading';
import nativeApi from '../../utils/nativeApi';
import Overview from './components/Overview';
import Statistics from './components/Statistics';
import Select from '../../components/Select';
import SelectButton from '../../components/SelectButton';
import styles from './index.less';
import useNotice, { Notice } from '../../hooks/useNotice';

import type {
  GachaData,
  GachaType,
  GachaItemType,
  StarType,
} from '../../../typings';

const DefaultGachaData: GachaData = {
  info: {
    uid: '',
    lang: 'zh-cn',
    export_app: '原神助手',
    export_app_version: '1.0.0',
    export_time: '',
    export_timestamp: '',
    update_time: '',
    uigf_version: 'v2.2',
  },
  list: [],
};

export interface PageProp {
  gacha: GachaData;
  filter: FilterType;
  toggleFilter: (...args: any[]) => void;
  notice: Notice;
}

export const GachaMap: Record<GachaType, string> = {
  activity: '活动祈愿',
  weapon: '武器祈愿',
  normal: '常驻祈愿',
  newer: '新手祈愿',
};

export type FilterType = {
  gacha: GachaType[];
  item: GachaItemType[];
  star: StarType[];
};

const DefaultFilters: FilterType = {
  gacha: ['activity', 'normal', 'weapon', 'newer'],
  item: ['weapon', 'role'],
  star: [3, 4, 5],
};

type Pages = 'overview' | 'data' | 'statistics';

const Gacha: React.FC = () => {
  const notice = useNotice();
  const navigate = useNavigate();
  const [type, setType] = useState<Pages>('overview');
  const [isWindows, setisWindows] = useState<boolean>(false);
  const [uid, setUid] = useState<string>('');
  const [filter, setfilter] = useState<FilterType>(DefaultFilters);
  const [gachas, setGachas] = useState<GachaData[]>([]);
  const [link, setLink] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const initGachaData = async (newUid?: string) => {
    const gachas: GachaData[] = await nativeApi.getLocalGachaDatas();
    setGachas(gachas);
    if (newUid) return setUid(newUid);
    const _uid: string = await nativeApi.getStoreKey('currentUid');
    const loggedUidGachaData = gachas.filter(e => e.info.uid === _uid)[0];
    if (loggedUidGachaData) {
      setUid(_uid);
    } else if (gachas.length) {
      setUid(gachas[0].info.uid);
      if (_uid) {
        notice.warning({
          message: '当前 UID 的祈愿数据不存在，已自动切换到本地其他 UID',
        });
      } else {
        notice.warning({
          message: '当前未登录米游社账号，已自动选择本地首个 UID',
        });
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
    if (loading)
      return notice.faild({ message: '派蒙正在努力获取，请不要重复点击啦！' });

    if (!link) {
      const msg = isWindows
        ? '请先 「获取本地链接」 或 「手动输入祈愿链接」'
        : // ? "请先输入祈愿链接后再尝试更新祈愿数据"
          '请先输入祈愿链接后再尝试更新祈愿数据';
      return notice.warning({ message: msg });
    }

    if (!link.match(/^https?:\/\//)) {
      return notice.faild({ message: '输入的祈愿链接无效，请检查后重试' });
    }

    notice.info({
      message: '派蒙努力加载中，预计需要一分钟...',
      autoHide: false,
    });

    setLoading(true);
    const data = await nativeApi.getGachaListByUrl(link);
    console.log('updateGachaData: ', data.list.length);

    if (data.list.length) {
      notice.success({
        message: `更新完成，共获取到 ${data.list.length} 条数据`,
      });
      await initGachaData(data.info.uid);
    } else {
      notice.faild({
        message:
          '数据拉取异常，链接可能已失效，请打开祈愿记录页并重新获取链接后重试',
        duration: 10000,
      });
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
      types[hasExist ? 'delete' : 'add'](target);
      const res = Array.from(types);
      setfilter({ ...filter, [type]: res });
    }
  };

  const copyLink = () => {
    nativeApi.writeClipboardText(link);
    notice.success({
      message: '已将 「祈愿记录链接」 复制到剪切板，可供其他软件和平台使用',
    });
  };

  const getLocalGachaUrl = async (isUserTrriger = false) => {
    const url = await nativeApi.getGachaUrl();
    setLink(url);
    if (url) {
      if (isUserTrriger) {
        notice.success({ message: '本地 「祈愿记录链接」 获取成功' });
      }
    } else {
      const message =
        '本地缓存中不存在有效链接，请先在游戏内打开 「祈愿历史记录」 页面';
      if (isUserTrriger) notice.faild({ message });
    }
    return !!url;
  };

  // const openTutorial = () => {
  //   open("https://docs.qq.com/doc/p/d4e754b865f99003c2495b038748b9359a7411bb");
  // };

  const gacha = gachas.filter(e => e.info.uid === uid)[0] || DefaultGachaData;
  const firsteDate = gacha.list.length ? gacha.list[0].time : '';
  const lastDate = gacha.list.length
    ? gacha.list[gacha.list.length - 1].time
    : '';
  const format = (str: string) => D(str).format('YYYY/M/D HH:mm');
  const dateRangeText = `${format(firsteDate)} ~ ${format(lastDate)}`;

  const handleImport = async () => {
    const { ok, message, data } = await nativeApi.importGacha();
    notice[ok ? 'success' : 'warning']({ message });

    if (ok) {
      const uid = data.info.uid;
      await initGachaData(uid);
    }
  };

  const handleExport = async () => {
    const { ok, message } = await nativeApi.exportGacha(uid);
    notice[ok ? 'success' : 'warning']({ message });
  };

  const handleBack = () => {
    if (loading) {
      notice.warning({ message: '请耐心等待数据加载完成...' });
    } else {
      navigate('/');
    }
  };

  const loadingText = loading
    ? '派蒙努力加载中，预计需要一分钟...'
    : '派蒙没有找到任何数据';
  const tip = `※ 共计 ${gacha.list.length} 条数据（覆盖范围：${dateRangeText}）。因官方设定，数据存在约一小时的延迟。`;
  const uids = gachas
    .map(e => e.info.uid)
    .sort((p, n) => Number(p) - Number(n));

  const items = [
    { value: 'overview', label: '总览' },
    { value: 'data', label: '数据' },
    { value: 'statistics', label: '统计' },
  ];

  const isEmpty = !loading && gachas.length === 0;

  const PageMap: Record<Pages, React.FC<PageProp>> = {
    overview: Overview,
    statistics: Statistics,
    data: Data,
  };

  const Page = PageMap[type];

  return (
    <>
      <div className={styles.container}>
        <>
          <CircleButton
            Icon={TiArrowBack}
            size="middle"
            className={styles.backBtn}
            onClick={handleBack}
          />
          <div className={styles.topZone}>
            <input
              value={link || ''}
              onBlur={e => setLink(e.target.value.trim())}
              onChange={e => setLink(e.target.value)}
              placeholder="祈愿记录链接（Ctrl + V 快捷键快速粘贴）"
            />
            {isWindows && link !== null && (
              <Button
                className={styles.btn}
                onClick={link ? copyLink : () => getLocalGachaUrl(true)}
                // onClick={link ? copyLink : openTutorial}
                style={{ marginRight: '12px' }}
                text={link ? '复制链接' : '获取本地链接'}
                // text={link ? "复制链接" : "查看获取教程"}
              />
            )}
            {link !== null && (
              <Button
                className={styles.btn}
                type="confirm"
                text="更新数据"
                onClick={updateGachaData}
              />
            )}
            <div className={styles.rightZone}>
              {gachas.length !== 0 && (
                <SelectButton
                  changeItem={setType}
                  className={styles.selectBtn}
                  items={items}
                  value={type}
                />
              )}
              <div
                className={styles.icon}
                title="导入单个 UID 祈愿数据"
                onClick={handleImport}
              >
                <BiImport size={20} title="导入单个 UID 的祈愿数据" />
              </div>
              {gachas.length !== 0 && (
                <div
                  className={styles.icon}
                  title="导出当前 UID 的祈愿数据"
                  onClick={handleExport}
                >
                  <BiExport size={20} title="导出当前选中 UID 的祈愿数据" />
                </div>
              )}
              {gachas.length !== 0 && (
                <Select
                  wrapperStyle={{ marginLeft: '12px' }}
                  name="UID"
                  onChange={e => setUid(e.target.value)}
                  options={uids.map(e => ({ value: e, label: e }))}
                  title="切换 UID"
                  value={uid}
                />
              )}
            </div>
          </div>
        </>

        {gacha.info.uid && !loading ? (
          <Page
            gacha={gacha}
            filter={filter}
            notice={notice}
            toggleFilter={toggleFilter}
          />
        ) : (
          <div style={{ display: 'flex', flex: 1 }}>
            <Loading
              text={link === null ? '' : loadingText}
              isEmpty={isEmpty}
            />
          </div>
        )}
        {gacha.list.length > 0 && !loading && (
          <span className={styles.dateTip}>{tip}</span>
        )}
      </div>
      {notice.holder}
    </>
  );
};

export default Gacha;
