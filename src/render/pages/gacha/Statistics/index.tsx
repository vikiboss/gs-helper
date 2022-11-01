import cn from 'classnames';
import D from 'dayjs';
import React from 'react';
import { TimeRangeDayData } from '@nivo/calendar';

import DateRange from './components/DateRange';
import ItemPie from './components/ItemPie';
import StarPie from './components/StarPie';
import TypePie from './components/TypePie'; 

import getPieData from '../utils/getPieData';
import filterGachaList from '../utils/filterGachaList';
import transformGachaDataDate from '../utils/transformGachaDataDate';

import type { GachaData, GachaItemType, GachaType, StarType } from '../../../../typings';
import type { PageProp } from '..';

import styles from './index.less';

type FilterBtn = { name: string; type: StarType | GachaType | GachaItemType };

type FilterLine = {
  type: keyof FilterType;
  btns: FilterBtn[];
};

export type FilterType = {
  gacha: GachaType[];
  item: GachaItemType[];
  star: StarType[];
};

const DefaultFilters: FilterType = {
  gacha: ['activity', 'normal', 'weapon', 'newer'],
  item: ['weapon', 'role'],
  star: [3, 4, 5]
};

const filterLines: FilterLine[] = [
  {
    type: 'item',
    btns: [
      { name: '角色', type: 'role' },
      { name: '武器', type: 'weapon' }
    ]
  },
  {
    type: 'star',
    btns: [
      { name: '5星', type: 5 },
      { name: '4星', type: 4 },
      { name: '3星', type: 3 }
    ]
  },
  {
    type: 'gacha',
    btns: [
      { name: '角色池', type: 'activity' },
      { name: '武器池', type: 'weapon' },
      { name: '常驻池', type: 'normal' },
      { name: '新手池', type: 'newer' }
    ]
  }
];

const getListTypeInfo = (list: GachaData['list']) => {
  const roles = list.filter((item) => item.item_type === '角色');
  const weapons = list.filter((item) => item.item_type === '武器');
  const r_5 = roles.filter((item) => item.rank_type === '5');
  const r_4 = roles.filter((item) => item.rank_type === '4');
  const w_5 = weapons.filter((item) => item.rank_type === '5');
  const w_4 = weapons.filter((item) => item.rank_type === '4');
  const w_3 = weapons.filter((item) => item.rank_type === '3');
  let message = '';
  message += r_5.length ? `5星角色${r_5.length}个 & ` : '';
  // message += r_5.length ? `5星角色${r_5.length}个（${r_5.join("、")}） & ` : "";
  message += r_4.length ? `4星角色${r_4.length}个 & ` : '';
  message += w_5.length ? `5星武器${w_5.length}个 & ` : '';
  // message += w_5.length ? `5星武器${w_5.length}个（${w_5.join("、")}） & ` : "";
  message += w_4.length ? `4星武器${w_4.length}个 & ` : '';
  message += w_3.length ? `3星武器${w_3.length}个 & ` : '';
  message = message.slice(0, message.length - 2).trim();
  return message;
};

const Statistics: React.FC<PageProp> = ({ gacha, filter, toggleFilter, notice }) => {
  const updateTime = gacha.info.update_time;
  const list = filterGachaList(gacha.list, filter);
  const now = new Date();
  const dateRange = [D(now).subtract(8, 'M').toDate(), now];

  const PieProps = {
    height: 248,
    style: { alignSelf: 'center' },
    width: 300,
    onClick: (e: { id: string | number; value: number }) => {
      notice.success({ message: e.id + '数：' + e.value });
    }
  };

  const rangeProps = {
    className: styles.timeRange,
    data: transformGachaDataDate(list),
    height: 168,
    range: dateRange,
    width: 600,
    onClick: (e: TimeRangeDayData) => {
      const limitedList = list.filter((item) => item.time.slice(0, 10) === e.day);
      const message = getListTypeInfo(limitedList);
      if (message) notice.success({ message });
    }
  };

  return (
    <div className={styles.content}>
      <div className={styles.row}>
        <div className={styles.filter}>
          <div className={styles.filterTitle}>〓筛选〓</div>
          <div className={styles.filterZone}>
            {filterLines.map((line, i) => {
              const filters: (StarType | GachaType | GachaItemType)[] = filter[line.type];
              const defaultArr = DefaultFilters[line.type];
              const isAll = filters.length === defaultArr.length;
              const selectClass = cn(styles.select, isAll ? styles.selectAll : '');
              return (
                <div className={styles.filterBtns} key={i}>
                  <div className={selectClass} onClick={() => toggleFilter(line.type)}>
                    {isAll ? '清空' : '全选'}
                  </div>
                  {line.btns.map((e) => {
                    const btnProps = {
                      className: cn(styles.btn, filters.includes(e.type) ? styles.btnActive : ''),
                      onClick: () => toggleFilter(line.type, e.type)
                    };
                    return <div {...btnProps} key={e.type}>{e.name}</div>;
                  })}
                </div>
              );
            })}
          </div>
          <div className={styles.tip}>上次数据更新时间：{updateTime}</div>
          <div className={styles.pieTitle}>〓多维饼图〓</div>
        </div>
        <div>
          <div className={styles.tableName}>〓祈愿日历〓</div>
          <div className={styles.timeRangeContainer}>
            <DateRange {...rangeProps} />
          </div>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.pieChart}>
          <StarPie {...PieProps} data={getPieData('star', list)} />
        </div>
        <div className={styles.pieChart}>
          <ItemPie {...PieProps} data={getPieData('item', list)} />
        </div>
        <div className={styles.pieChart}>
          <TypePie {...PieProps} data={getPieData('type', list)} />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
