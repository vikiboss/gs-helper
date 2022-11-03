import React, { useEffect, useState } from 'react';
import D from 'dayjs';
import { BiImport, BiExport } from 'react-icons/bi';
import { TiArrowBack } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/Button';
import CircleButton from '../../components/CircleButton';
import Data from './Data';
import Loading from '../../components/Loading';
import nativeApi from '../../utils/nativeApi';
import Overview from './Overview';
import Select from '../../components/Select';
import SelectButton from '../../components/SelectButton';
import Statistics from './Statistics';
import useNotice, { type Notice } from '../../hooks/useNotice';

import type { GachaData, GachaType, GachaItemType, StarType } from '../../../typings';

import styles from './index.less';
const DefaultGachaData: GachaData = {
  info: {
    uid: '',
    lang: '',
    export_app: '',
    export_app_version: '',
    export_time: '',
    export_timestamp: '',
    update_time: '',
    uigf_version: '',
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
  const [isWindows, setisWindows] = useState<boolean>(true);
  const [uid, setUid] = useState<string>('');
  const [filter, setfilter] = useState<FilterType>(DefaultFilters);
  const [gachas, setGachas] = useState<GachaData[]>([]);
  const [link, setLink] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const initGachaData = async (newUid?: string) => {
    const gachas: GachaData[] = await nativeApi.getLocalGachaDatas();
    setGachas(gachas);

    if (newUid) {
      return setUid(newUid);
    }

    const _uid: string = await nativeApi.getStoreKey('currentUid');
    const loggedUidGachaData = gachas.find((e) => e.info.uid === _uid);

    if (loggedUidGachaData) {
      setUid(_uid);
    } else if (gachas.length) {
      setUid(gachas[0].info.uid);

      if (_uid) {
        notice.warning({ message: '当前 UID 的祈愿数据不存在，已自动切换到本地其他 UID' });
      } else {
        notice.warning({ message: '当前未登录米游社账号，已自动选择本地首个 UID' });
      }
    }

    const isWindows = (await nativeApi.getAppInfo()).isWindows;

    setisWindows(isWindows);

    if (isWindows) {
      await getLocalGachaUrl();
    }
  };

  useEffect(() => void initGachaData(), []);

  const updateGachaData = async () => {
    if (loading) {
      return notice.faild({ message: '派蒙正在努力获取，请不要重复点击啦！' });
    }

    if (!link) {
      const message = isWindows ? '请先 「获取本地链接」 或 「手动输入祈愿链接」' : '请先输入祈愿链接后再尝试更新祈愿数据';
      return notice.warning({ message });
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
      notice.success({ message: `更新完成，共获取到 ${data.list.length} 条数据` });

      await initGachaData(data.info.uid);
    } else {
      notice.faild({
        message: '数据拉取异常，链接可能已失效，请打开祈愿记录页并重新获取链接后重试',
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
    notice.success({ message: '已将 「祈愿记录链接」 复制到剪切板，可供其他软件和平台使用' });
  };

  const getLocalGachaUrl = async (isUserTrriger = false) => {
    const url = await nativeApi.getGachaUrl();

    if (url) {
      setLink(url);

      if (isUserTrriger) {
        notice.success({ message: '本地 「祈愿记录链接」 获取成功' });
      }
    } else {
      if (isUserTrriger) {
        const message = '本地缓存中不存在有效链接，请先在游戏内打开 「祈愿历史记录」 页面';
        notice.faild({ message });
      }
    }
    return !!url;
  };

  const gacha = gachas.find((e) => e.info.uid === uid) || DefaultGachaData;

  const firsteDate = gacha.list.length ? gacha.list[0].time : '';
  const lastDate = gacha.list.length ? gacha.list[gacha.list.length - 1].time : '';
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

  const loadingText = loading ? '派蒙努力加载中，预计需要一分钟...' : '派蒙没有找到任何数据';
  const tip = `※ 共计 ${gacha.list.length} 条数据（覆盖范围：${dateRangeText}）。因官方设定，数据存在约一小时的延迟。`;
  const uids = gachas.map((e) => e.info.uid).sort((p, n) => Number(p) - Number(n));

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
          <CircleButton Icon={TiArrowBack} size='middle' className={styles.backBtn} onClick={handleBack} />
          <div className={styles.topZone}>
            <input
              value={link || ''}
              onBlur={(e) => setLink(e.target.value.trim())}
              onChange={(e) => setLink(e.target.value)}
              placeholder='祈愿记录链接（使用 Ctrl + V 快捷键进行粘贴）'
            />

            <Button className={styles.btn} style={{ marginRight: '12px' }} type='confirm' text='更新数据' onClick={updateGachaData} />

            {isWindows && (
              <Button className={styles.btn} onClick={link ? copyLink : () => getLocalGachaUrl(true)} text={link ? '复制' : '读取链接'} />
            )}

            <div className={styles.rightZone}>
              {gachas.length !== 0 && <SelectButton changeItem={setType} className={styles.selectBtn} items={items} value={type} />}

              <div className={styles.icon} title='从本地导入 UIGF 规范的祈愿数据（JSON 格式）' onClick={handleImport}>
                <BiImport size={20} />
              </div>

              {gachas.length !== 0 && (
                <div className={styles.icon} title='将当前 UID 祈愿数据按 UIGF 规范进行导出（JSON 格式）' onClick={handleExport}>
                  <BiExport size={20} />
                </div>
              )}

              {gachas.length !== 0 && (
                <Select
                  wrapperStyle={{ marginLeft: '12px' }}
                  name='UID'
                  onChange={(e) => setUid(e.target.value)}
                  options={uids.map((e) => ({ value: e, label: e }))}
                  title='切换 UID'
                  value={uid}
                />
              )}
            </div>
          </div>
        </>

        {gacha.info.uid && !loading ? (
          <Page gacha={gacha} filter={filter} notice={notice} toggleFilter={toggleFilter} />
        ) : (
          <Loading text={link === null ? '' : loadingText} isEmpty={isEmpty} style={{ flex: 1 }} />
        )}
        {gacha.list.length > 0 && !loading && <span className={styles.dateTip}>{tip}</span>}
      </div>
      {notice.holder}
    </>
  );
};

export default Gacha;
