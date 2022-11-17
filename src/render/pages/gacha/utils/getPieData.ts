import { GachaTypeMap, ItemTypeMap } from './filterGachaList'

import type { GachaData } from '../../../../typings'

export const Colors: Record<string, string> = {
  blue: '#73abcd',
  purple: '#9779c2',
  golden: '#ffa564',
  red: '#da4e55'
}

const s5 = {
  id: '5星',
  label: '5星',
  value: 0,
  color: Colors.golden
}

const s4 = {
  id: '4星',
  label: '4星',
  value: 0,
  color: Colors.purple
}

const s3 = {
  id: '3星',
  label: '3星',
  value: 0,
  color: Colors.blue
}

const i1 = {
  id: '角色',
  label: '角色',
  value: 0,
  color: Colors.golden
}

const i2 = {
  id: '武器',
  label: '武器',
  value: 0,
  color: Colors.purple
}

const t1 = {
  id: '角色池',
  label: '角色池',
  value: 0,
  color: Colors.golden
}

const t2 = {
  id: '武器池',
  label: '武器池',
  value: 0,
  color: Colors.purple
}

const t3 = {
  id: '常驻池',
  label: '常驻池',
  value: 0,
  color: Colors.blue
}

const t4 = {
  id: '新手池',
  label: '新手池',
  value: 0,
  color: Colors.purple
}

const getPieData = (type: 'star' | 'item' | 'type', list: GachaData['list']) => {
  switch (type) {
    case 'star': {
      ;[s5, s4, s3].forEach((e) => {
        e.value = 0
      })
      for (const item of list) {
        if (item.rank_type === '5') s5.value++
        if (item.rank_type === '4') s4.value++
        if (item.rank_type === '3') s3.value++
      }
      return [s3, s4, s5]
    }
    case 'item': {
      ;[i1, i2].forEach((e) => {
        e.value = 0
      })
      for (const item of list) {
        if (item.item_type === ItemTypeMap.role) i1.value++
        if (item.item_type === ItemTypeMap.weapon) i2.value++
      }
      return [i1, i2]
    }
    case 'type': {
      ;[t1, t2, t3, t4].forEach((e) => {
        e.value = 0
      })
      for (const { uigf_gacha_type: _type } of list) {
        if (_type === GachaTypeMap.activity) {
          t1.value++
        }

        if (_type === GachaTypeMap.weapon) {
          t2.value++
        }

        if (_type === GachaTypeMap.normal) {
          t3.value++
        }

        if (_type === GachaTypeMap.newer) {
          t4.value++
        }
      }
      return [t1, t2, t3, t4]
    }

    default: {
      return []
    }
  }
}

export default getPieData
