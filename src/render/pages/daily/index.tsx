import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { TiArrowBack } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';

import CircleButton from '../../components/CircleButton';
import Loading from '../../components/Loading';
import nativeApi from '../../utils/nativeApi';
import useApi from '../../hooks/useApi';
import useNotice from '../../hooks/useNotice';

import type { CalenderEvent } from '../../../services/getCalenderList';

import styles from './index.less';

type Type = 'roles' | 'weapons' | 'materials';

const WeekMap = ['日', '一', '二', '三', '四', '五', '六'];

const Types: { title: string; name: Type }[] = [
  { title: '按素材查看', name: 'materials' },
  { title: '按角色查看', name: 'roles' },
  { title: '按武器查看', name: 'weapons' },
];

const Tips = [
  '「周日」 所有秘境均开放，所有材料均可获取。',
  '「周一」 与 「周四」 开放的秘境和可获取的材料相同。',
  '「周二」 与 「周五」 开放的秘境和可获取的材料相同。',
  '「周三」 与 「周六」 开放的秘境和可获取的材料相同。',
  '「周一」 与 「周四」 开放的秘境和可获取的材料相同。',
  '「周二」 与 「周五」 开放的秘境和可获取的材料相同。',
  '「周三」 与 「周六」 开放的秘境和可获取的材料相同。',
];

const getUniqueArray = (arr: any[], key: string) => {
  const set = new Set();
  const results = [];
  for (const e of arr) {
    if (!set.has(e[key])) {
      set.add(e[key]);
      results.push(e);
    }
  }
  return results;
};

const getMaterialList = (list: CalenderEvent[]) => {
  const isMaterial = (event: CalenderEvent) => event.kind === '2';
  const kind2 = list.filter(isMaterial);

  const materials: CalenderEvent[] = [];

  for (const e of kind2) {
    const infos = e.contentInfos;
    const len = infos.length;

    if (len) {
      const talent = infos.find((e) => e.title.includes('哲学'));

      if (talent) {
        const item = infos[0].title.includes('「') ? talent : infos[len - 1];
        const title = item.title.slice(0, 4) + '系列';

        materials.push({ ...e, title, img_url: item.icon });
      }
    }
  }

  return getUniqueArray(materials, 'title');
};

const Daily: React.FC = () => {
  const todayWeek = new Date().getDay();
  const navigate = useNavigate();
  const notice = useNotice();
  const [type, setType] = useState<Type>('roles');
  const [week, setWeek] = useState<number>(todayWeek);
  const [fetch, cals = [], loading, err] = useApi<CalenderEvent[]>(nativeApi.getCalenderList);

  const fetchData = async () => {
    await fetch();

    if (err) {
      notice.faild({ message: err });
    }
  };

  useEffect(() => void fetchData(), []);

  // 角色
  const roles = cals.filter((e) => e.break_type === '2');
  roles.sort((p, n) => JSON.parse(p.sort)[0] - JSON.parse(n.sort)[0]);

  // 武器
  const weapons = cals.filter((e) => e.break_type === '1');
  weapons.sort((p, n) => JSON.parse(p.sort)[0] - JSON.parse(n.sort)[0]);

  // 材料
  const materials = getMaterialList(cals);
  materials.sort((p, n) => JSON.parse(n.sort)[0] - JSON.parse(p.sort)[0]);

  const EventMap: Record<string, CalenderEvent[]> = { roles, weapons, materials };

  const isToday = (arr: string[]) => arr.includes(String(((week + 6) % 7) + 1));
  const list = EventMap[type].filter((e) => isToday(e.drop_day));

  const handleItemClick = (e: CalenderEvent) => {
    let message = type === 'roles' ? `「${e.title}」 天赋培养需要：` : '';

    const contents = `${e.contentInfos.map((e) => e.title).join('、')}`;

    message += type !== 'materials' ? contents : e.title;
    message += `，可在 「${e.contentSource[0]?.title || '忘却之峡'}」 获取`;

    notice.info({ message });
  };

  const todayClass = cn(styles.btn, todayWeek === week ? styles.active : '');

  return (
    <>
      <div className={styles.container}>
        {!loading ? (
          <>
            <div className={styles.top}>
              <div className={styles.title}>材料日历</div>
            </div>
            <div className={styles.content}>
              <div className={styles.contentTop}>
                <div className={styles.weeks}>
                  <div className={todayClass} onClick={() => setWeek(todayWeek)}>
                    今日
                  </div>
                  <span>|</span>
                  {WeekMap.map((e, i) => {
                    const className = cn(styles.btn, i === week ? styles.active : '');
                    return (
                      <div key={e} className={className} onClick={() => setWeek(i)}>
                        周{e}
                      </div>
                    );
                  })}
                </div>
                <div className={styles.types}>
                  {Types.map((e) => {
                    const className = cn(styles.btn, e.name === type ? styles.active : '');
                    return (
                      <div key={e.name} className={className} onClick={() => setType(e.name)}>
                        {e.title}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className={styles.main}>
                {list.map((e) => (
                  <div key={e.title} onClick={() => handleItemClick(e)}>
                    <img src={e.img_url} />
                    <span>{e.title}</span>
                  </div>
                ))}
              </div>
              <span className={styles.tip}>
                ※ {Tips[week]}秘境在每天的凌晨四点刷新，若当前时间超过零点但未过凌晨四点，请以前一日数据为准。
              </span>
            </div>
          </>
        ) : (
          <Loading />
        )}

        <CircleButton Icon={TiArrowBack} size='middle' className={styles.backBtn} onClick={() => navigate('/')} />
      </div>
      {notice.holder}
    </>
  );
};

export default Daily;
